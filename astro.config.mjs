import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const normalizeUrl = (value) => (value.endsWith('/') ? value : `${value}/`);
const rawSiteUrl = process.env.PUBLIC_SITE_URL || process.env.EXTERNAL_SITE_URL || 'https://electron-rare.github.io/';
const siteUrl = normalizeUrl(rawSiteUrl);
const sitePathname = new URL(siteUrl).pathname;
const basePath = sitePathname === '/' ? '/' : sitePathname.replace(/\/$/, '');

export default defineConfig({
  site: siteUrl,
  base: basePath,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});
