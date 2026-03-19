import type { APIRoute } from 'astro';

interface LeadSubmission {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  sourceChannel?: string;
  sourceDetail?: string;
  pagePath?: string;
  needType?: string;
}

interface FrappePayload {
  first_name: string;
  last_name?: string;
  email: string;
  mobile_no?: string;
  organization?: string;
  custom_source_channel: string;
  custom_source_detail?: string;
  custom_need_type: string;
  custom_segment: string;
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

// Allowed origins for CORS
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

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const origin = request.headers.get('origin');

  // CORS check — reject unknown origins (allow null for same-origin)
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return new Response(JSON.stringify({ error: 'forbidden' }), {
      status: 403,
      headers: corsHeaders(null),
    });
  }

  // Rate limiting
  const ip = clientAddress || request.headers.get('x-forwarded-for') || 'unknown';
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: 'too many requests' }), {
      status: 429,
      headers: { ...corsHeaders(origin), 'Retry-After': '3600' },
    });
  }

  const FRAPPE_URL = import.meta.env.FRAPPE_URL || process.env.FRAPPE_URL;
  const FRAPPE_API_KEY = import.meta.env.FRAPPE_API_KEY || process.env.FRAPPE_API_KEY;
  const FRAPPE_API_SECRET = import.meta.env.FRAPPE_API_SECRET || process.env.FRAPPE_API_SECRET;
  const CRM_FALLBACK_URL = import.meta.env.CRM_FALLBACK_URL || process.env.CRM_FALLBACK_URL;

  if (!FRAPPE_URL || !FRAPPE_API_KEY || !FRAPPE_API_SECRET) {
    console.error('[submit-lead] Missing Frappe env vars');
    return new Response(JSON.stringify({ error: 'server misconfigured' }), {
      status: 500,
      headers: corsHeaders(origin),
    });
  }

  let body: LeadSubmission;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid JSON body' }), {
      status: 400,
      headers: corsHeaders(origin),
    });
  }

  // Validate required fields
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

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

  // Split full name into first/last
  const nameParts = name.split(/\s+/);
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : undefined;

  const sourceChannel = body.sourceChannel || 'site';
  const needType = body.needType || 'technique';

  const segment =
    needType === 'formation'
      ? 'formation'
      : sourceChannel === 'fat' || sourceChannel === 'hemisphere'
        ? 'culture'
        : 'industrie';

  const frappePayload: FrappePayload = {
    first_name: firstName,
    email,
    custom_source_channel: sourceChannel,
    custom_need_type: needType,
    custom_segment: segment,
  };

  if (lastName) frappePayload.last_name = lastName;
  if (body.phone) frappePayload.mobile_no = body.phone;
  if (body.organization) frappePayload.organization = body.organization;
  if (body.sourceDetail || body.pagePath) {
    frappePayload.custom_source_detail = body.sourceDetail || body.pagePath;
  }

  console.info('[submit-lead] Submitting lead', { email, sourceChannel, needType, segment });

  const FRAPPE_HOST = import.meta.env.FRAPPE_HOST_HEADER || process.env.FRAPPE_HOST_HEADER || '';

  try {
    const frappeHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `token ${FRAPPE_API_KEY}:${FRAPPE_API_SECRET}`,
    };
    if (FRAPPE_HOST) frappeHeaders['Host'] = FRAPPE_HOST;

    const resp = await fetch(`${FRAPPE_URL}/api/resource/CRM Lead`, {
      method: 'POST',
      headers: frappeHeaders,
      body: JSON.stringify(frappePayload),
    });

    if (!resp.ok) {
      // Log status only — never log response body (may contain secrets)
      console.error('[submit-lead] Frappe returned', resp.status);

      // Dual-write fallback
      if (CRM_FALLBACK_URL) {
        console.info('[submit-lead] Attempting CRM fallback');
        try {
          const fallbackResp = await fetch(`${CRM_FALLBACK_URL}/api/intake/lead`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name,
              email,
              phone: body.phone,
              organization: body.organization,
              sourceChannel,
              needType,
            }),
          });
          if (fallbackResp.ok) {
            return new Response(JSON.stringify({ ok: true, via: 'fallback' }), {
              status: 201,
              headers: corsHeaders(origin),
            });
          }
          console.error('[submit-lead] Fallback returned', fallbackResp.status);
        } catch {
          console.error('[submit-lead] Fallback network error');
        }
      }

      return new Response(JSON.stringify({ error: 'submission failed' }), {
        status: 502,
        headers: corsHeaders(origin),
      });
    }

    console.info('[submit-lead] Lead created');
    return new Response(JSON.stringify({ ok: true }), {
      status: 201,
      headers: corsHeaders(origin),
    });
  } catch {
    console.error('[submit-lead] Network error');
    return new Response(JSON.stringify({ error: 'internal error' }), {
      status: 500,
      headers: corsHeaders(origin),
    });
  }
};
