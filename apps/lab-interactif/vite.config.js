import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const normalizeUrl = (value) => (value.endsWith('/') ? value : `${value}/`);
const rawSiteUrl = process.env.PUBLIC_SITE_URL || process.env.EXTERNAL_SITE_URL || 'https://electron-rare.github.io/';
const parsedSiteUrl = new URL(normalizeUrl(rawSiteUrl));
const siteBasePath = parsedSiteUrl.pathname === '/' ? '' : parsedSiteUrl.pathname.replace(/\/$/, '');
const labBase = `${siteBasePath}/lab/`;

export default defineConfig({
  plugins: [react()],
  base: labBase,
  build: {
    outDir: '../../lab',
    emptyOutDir: true
  }
});
