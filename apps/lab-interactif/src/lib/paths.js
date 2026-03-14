const normalizeBaseUrl = (value) => (value.endsWith('/') ? value : `${value}/`);

export const LAB_BASE_URL = normalizeBaseUrl(import.meta.env.BASE_URL || '/lab/');
export const SITE_BASE_URL = LAB_BASE_URL.replace(/lab\/$/, '');

const isExternalUrl = (value) =>
  /^(?:[a-z]+:)?\/\//i.test(value) || value.startsWith('mailto:') || value.startsWith('tel:');

export function withSiteBase(value) {
  if (!value || isExternalUrl(value)) {
    return value;
  }

  if (value.startsWith('/#')) {
    return `${SITE_BASE_URL}#${value.slice(2)}`;
  }

  if (value.startsWith('#') || value.startsWith('?')) {
    return value;
  }

  const normalizedPath = value.startsWith('/') ? value.slice(1) : value;
  return `${SITE_BASE_URL}${normalizedPath}`;
}

export function labHashHref(pathname = '/') {
  const normalizedPath = pathname === '/' ? '/' : pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${LAB_BASE_URL}#${normalizedPath}`;
}
