import type { APIRoute } from 'astro';

interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  needType?: string;
  message?: string;
  sourceChannel?: string;
  sourceDetail?: string;
  pagePath?: string;
}

// Strict email validation (RFC 5322 simplified)
const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Rate limiting: simple in-memory sliding window (per IP)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 3600_000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];
  const recent = timestamps.filter(t => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

const ALLOWED_ORIGINS = new Set([
  'https://www.lelectronrare.fr',
  'https://lelectronrare.fr',
  'https://electron-rare.github.io',
  'https://electron.saillant.cc',
]);

function corsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
}

function escapeHtml(s: string): string {
  return String(s).replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const origin = request.headers.get('origin');

  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return new Response(JSON.stringify({ error: 'forbidden' }), {
      status: 403,
      headers: corsHeaders(null),
    });
  }

  const ip = clientAddress || request.headers.get('x-forwarded-for') || 'unknown';
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: 'too many requests' }), {
      status: 429,
      headers: { ...corsHeaders(origin), 'Retry-After': '3600' },
    });
  }

  const MAIL_API_URL = process.env.MAIL_API_URL || 'http://mail-api:3200/api/mail/send';
  const MAIL_FROM = process.env.MAIL_FROM || 'contact@lelectronrare.fr';
  const MAIL_TO = process.env.MAIL_TO || 'contact@lelectronrare.fr';

  let body: ContactSubmission;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid JSON body' }), {
      status: 400,
      headers: corsHeaders(origin),
    });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const organization = typeof body.organization === 'string' ? body.organization.trim() : '';
  const needType = typeof body.needType === 'string' ? body.needType.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const pagePath = typeof body.pagePath === 'string' ? body.pagePath.trim() : '';

  if (!name || name.length < 2 || name.length > 200) {
    return new Response(JSON.stringify({ error: 'name must be 2-200 characters' }), {
      status: 400,
      headers: corsHeaders(origin),
    });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ error: 'valid email required' }), {
      status: 400,
      headers: corsHeaders(origin),
    });
  }
  if (message.length > 5000) {
    return new Response(JSON.stringify({ error: 'message too long (max 5000)' }), {
      status: 400,
      headers: corsHeaders(origin),
    });
  }

  const subject = `[lelectronrare] ${needType || 'demande'} — ${name}`;

  const text = `Nouveau message depuis lelectronrare.fr

Nom         : ${name}
Email       : ${email}
Téléphone   : ${phone || '-'}
Organisation: ${organization || '-'}
Type        : ${needType || '-'}
Page        : ${pagePath || '-'}
IP          : ${ip}

Message :
${message || '(vide)'}
`;

  const html = `<!DOCTYPE html><html><body style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#222;">
  <h2 style="color:#5bd1d8;border-bottom:1px solid #eee;padding-bottom:8px;">Nouveau message — lelectronrare.fr</h2>
  <table style="border-collapse:collapse;width:100%;font-size:14px;">
    <tr><td style="padding:6px;"><b>Nom</b></td><td style="padding:6px;">${escapeHtml(name)}</td></tr>
    <tr><td style="padding:6px;"><b>Email</b></td><td style="padding:6px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
    <tr><td style="padding:6px;"><b>Téléphone</b></td><td style="padding:6px;">${escapeHtml(phone || '-')}</td></tr>
    <tr><td style="padding:6px;"><b>Organisation</b></td><td style="padding:6px;">${escapeHtml(organization || '-')}</td></tr>
    <tr><td style="padding:6px;"><b>Type</b></td><td style="padding:6px;">${escapeHtml(needType || '-')}</td></tr>
    <tr><td style="padding:6px;color:#999;font-size:11px;"><b>IP</b></td><td style="padding:6px;color:#999;font-size:11px;">${escapeHtml(ip)}</td></tr>
  </table>
  <h3 style="margin-top:20px;font-size:14px;color:#666;">Message</h3>
  <pre style="background:#f5f5f5;padding:12px;border-radius:6px;white-space:pre-wrap;font-family:inherit;font-size:13px;line-height:1.5;">${escapeHtml(message || '(vide)')}</pre>
  <p style="margin-top:20px;font-size:11px;color:#aaa;">Reply-To pointe vers l'email du visiteur — répondre directement.</p>
</body></html>`;

  try {
    const resp = await fetch(MAIL_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: MAIL_TO,
        subject,
        text,
        html,
        replyTo: `${name.replace(/[<>"]/g, '')} <${email}>`,
      }),
    });

    if (!resp.ok) {
      console.error('[submit-lead] mail-api returned', resp.status);
      return new Response(JSON.stringify({ error: 'send failed' }), {
        status: 502,
        headers: corsHeaders(origin),
      });
    }

    console.info('[submit-lead] Mail relayed via mail-api', { needType, hasOrg: !!organization });
    return new Response(JSON.stringify({ ok: true }), {
      status: 201,
      headers: corsHeaders(origin),
    });
  } catch (err) {
    console.error('[submit-lead] mail-api unreachable', err instanceof Error ? err.message : 'unknown');
    return new Response(JSON.stringify({ error: 'mail service unreachable' }), {
      status: 502,
      headers: corsHeaders(origin),
    });
  }
};
