const target = process.argv[2] || 'preview';

function normalizeUrl(value) {
  return value.endsWith('/') ? value : `${value}/`;
}

function resolveBaseUrl() {
  if (target === 'preview') {
    return process.env.PUBLIC_SITE_URL_PREVIEW;
  }

  if (target === 'production' || target === 'prod') {
    return process.env.PUBLIC_SITE_URL_PROD || process.env.PUBLIC_SITE_URL;
  }

  throw new Error(`Unknown target "${target}". Use "preview" or "production".`);
}

const baseUrl = resolveBaseUrl();

if (!baseUrl) {
  throw new Error(`Missing public base URL for target "${target}".`);
}

const rootUrl = normalizeUrl(baseUrl);
const formationUrl = new URL('formation/', rootUrl).href;
const legalUrl = new URL('mentions-legales/', rootUrl).href;

const checks = [
  {
    url: rootUrl,
    includes: ['data-theme="high-contrast"', 'Électronique embarquée du signal au produit'],
    excludes: ['Mode contraste']
  },
  {
    url: formationUrl,
    includes: ['Formation']
  },
  {
    url: legalUrl,
    includes: ['Mentions légales']
  }
];

for (const check of checks) {
  const response = await fetch(check.url, {
    headers: {
      'user-agent': 'electron-rare-gh-verify/1.0'
    },
    redirect: 'follow'
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${check.url}`);
  }

  const text = await response.text();

  for (const needle of check.includes || []) {
    if (!text.includes(needle)) {
      throw new Error(`Missing "${needle}" in ${check.url}`);
    }
  }

  for (const needle of check.excludes || []) {
    if (text.includes(needle)) {
      throw new Error(`Unexpected "${needle}" in ${check.url}`);
    }
  }
}

console.log(`Public verification passed for ${target}: ${rootUrl}`);
