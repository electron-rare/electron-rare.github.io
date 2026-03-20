import type { APIRoute } from 'astro';
import { CANONICAL_URL, SITE_IS_SUBPATH_BUILD } from '../lib/site';

export const GET: APIRoute = () => {
  const body = SITE_IS_SUBPATH_BUILD
    ? `User-agent: *
Disallow: /
`
    : `User-agent: *
Allow: /
Disallow: /preview
Disallow: /ops
Disallow: /intranet
Disallow: /portfolio
Disallow: /countdown

Sitemap: ${CANONICAL_URL}sitemap.xml
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
