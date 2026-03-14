import type { APIRoute } from 'astro';
import { CANONICAL_URL, PUBLIC_SITE_ROOT_URL, SITE_IS_SUBPATH_BUILD } from '../lib/site';

export const GET: APIRoute = () => {
  const sitemapRootUrl = SITE_IS_SUBPATH_BUILD ? PUBLIC_SITE_ROOT_URL : CANONICAL_URL;
  const pages = [
    { path: '', priority: '1.0', changefreq: 'weekly' },
    { path: 'formation/', priority: '0.9', changefreq: 'monthly' },
    { path: 'lab/', priority: '0.8', changefreq: 'weekly' },
    { path: 'mentions-legales/', priority: '0.3', changefreq: 'yearly' }
  ];

  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${new URL(page.path, sitemapRootUrl).href}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
};
