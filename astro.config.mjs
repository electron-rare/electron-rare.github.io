import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const siteUrl = process.env.PUBLIC_SITE_URL || 'https://electron-rare.github.io/';

export default defineConfig({
  site: siteUrl,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});
