import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const rawSiteUrl = process.env.PUBLIC_SITE_URL || process.env.EXTERNAL_SITE_URL;
if (!rawSiteUrl) {
  console.error(
    '[build-astro-external] Missing PUBLIC_SITE_URL (or EXTERNAL_SITE_URL). Refusing external build with fallback canonical.'
  );
  process.exit(1);
}

const normalizeUrl = (value) => (value.endsWith('/') ? value : `${value}/`);
process.env.PUBLIC_SITE_URL = normalizeUrl(rawSiteUrl);
const siteUrl = process.env.PUBLIC_SITE_URL;

const run = (command) => {
  execSync(command, {
    stdio: 'inherit',
    env: process.env
  });
};

console.log(`[build-astro-external] Using PUBLIC_SITE_URL=${process.env.PUBLIC_SITE_URL}`);

run('npm run lab:build');
run('npm run build');

const labSource = path.resolve(process.cwd(), 'lab');
const labDestination = path.resolve(process.cwd(), 'dist', 'lab');

if (fs.existsSync(labSource)) {
  fs.rmSync(labDestination, { recursive: true, force: true });
  fs.cpSync(labSource, labDestination, { recursive: true });
  console.log('[build-astro-external] Included lab/ output in dist/lab.');
} else {
  console.warn('[build-astro-external] Warning: lab/ not found; skipping lab route packaging.');
}

const robotsContent = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n`;
const sitemapContent = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  <url>\n    <loc>${siteUrl}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n  <url>\n    <loc>${siteUrl}lab/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n</urlset>\n`;

fs.writeFileSync(path.resolve(process.cwd(), 'dist', 'robots.txt'), robotsContent, 'utf8');
fs.writeFileSync(path.resolve(process.cwd(), 'dist', 'sitemap.xml'), sitemapContent, 'utf8');
console.log('[build-astro-external] Wrote dist/robots.txt and dist/sitemap.xml for external domain.');

console.log('[build-astro-external] External Astro build done.');
