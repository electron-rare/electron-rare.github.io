export const SITE_URL = 'https://electron-rare.github.io/';

export const SITE_META = {
  title: "Clément Saillant — L'électron rare",
  description:
    "Studio de Clément Saillant (L'électron rare) : création électronique, invention de systèmes, design produit et projets audiovisuels.",
  ogDescription:
    "Codeur créatif, itérateur IA et concepteur : création électronique, design produit, systèmes expérimentaux et collaborations visuelles.",
  twitterDescription:
    "Creation electronique, invention de systemes et design produit sous l'identite L'electron rare.",
  ogImagePath: 'assets/og-cover.jpg',
  themeColor: '#0f0e17'
} as const;

export const SITE_OG_IMAGE_URL = `${SITE_URL}${SITE_META.ogImagePath}`;

export const GTM_CONTAINER_ID_DEFAULT = 'GTM-5SLM67QF';
