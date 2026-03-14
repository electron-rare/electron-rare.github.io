const normalizeUrl = (value: string) => (value.endsWith('/') ? value : `${value}/`);

const resolvedSiteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://electron-rare.github.io/';

const parsedSiteUrl = new URL(normalizeUrl(resolvedSiteUrl));
const resolvedBasePath = parsedSiteUrl.pathname === '/' ? '' : parsedSiteUrl.pathname.replace(/\/$/, '');

export const SITE_URL = parsedSiteUrl.href;
export const SITE_BASE_PATH = resolvedBasePath;
export const SITE_IS_SUBPATH_BUILD = SITE_BASE_PATH !== '';

export const CANONICAL_URL = 'https://www.lelectronrare.fr/';
export const PUBLIC_SITE_ROOT_URL = SITE_IS_SUBPATH_BUILD ? SITE_URL : CANONICAL_URL;

export function withSiteBase(value: string) {
  if (!value) {
    return SITE_BASE_PATH || '/';
  }

  if (/^(?:[a-z]+:)?\/\//i.test(value) || value.startsWith('mailto:') || value.startsWith('tel:')) {
    return value;
  }

  if (value.startsWith('#') || value.startsWith('?')) {
    return value;
  }

  const normalizedPath = value.startsWith('/') ? value : `/${value}`;
  return SITE_BASE_PATH ? `${SITE_BASE_PATH}${normalizedPath}` : normalizedPath;
}

export function stripSiteBase(pathname: string) {
  if (!pathname) {
    return '/';
  }

  if (!SITE_BASE_PATH) {
    return pathname;
  }

  if (pathname === SITE_BASE_PATH) {
    return '/';
  }

  if (pathname.startsWith(`${SITE_BASE_PATH}/`)) {
    return pathname.slice(SITE_BASE_PATH.length) || '/';
  }

  return pathname;
}

export const SITE_META = {
  title: "Clément Saillant — L'électron rare",
  description:
    "Studio de Clément Saillant (L'électron rare) : création électronique, invention de systèmes, design produit et projets audiovisuels.",
  ogDescription:
    "Codeur créatif, itérateur IA et concepteur : création électronique, design produit, systèmes expérimentaux et collaborations visuelles.",
  twitterDescription:
    "Creation electronique, invention de systemes et design produit sous l'identite L'electron rare.",
  ogImagePath: 'assets/og-cover.jpg',
  themeColor: '#f4eee3'
} as const;

export const SITE_OG_IMAGE_URL = new URL(SITE_META.ogImagePath, PUBLIC_SITE_ROOT_URL).href;

export const GTM_CONTAINER_ID_DEFAULT = 'GTM-5SLM67QF';
