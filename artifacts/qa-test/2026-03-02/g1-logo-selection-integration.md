# G1 Logo Selection + Integration

Date: 2026-03-02
Status: PASS

## Source and selection
- Source officielle: `output/VALIDE DA`
- Note de selection: `notes-interne/logo-selection-2026-03-02.md`
- Winner: `001-create-a-vector-logo-for-electron-rare-with-an-er-monogram-b.png`
- Backup A: `010-produce-a-favicon-first-hazard-signal-icon-for-electron-rare.png`
- Backup B: `005-generate-a-minimal-industrial-logo-with-telemetry-data-frame.png`

## Freeze working set
- `tmp/brand-selection/001-create-a-vector-logo-for-electron-rare-with-an-er-monogram-b.png`
- `tmp/brand-selection/010-produce-a-favicon-first-hazard-signal-icon-for-electron-rare.png`
- `tmp/brand-selection/005-generate-a-minimal-industrial-logo-with-telemetry-data-frame.png`

## Assets generated
- `public/assets/brand/logo-mark.png` (1024x1024)
- `public/assets/brand/logo-lockup.png` (1400x700)
- `public/assets/brand/logo-mark.svg` (derived)
- `public/assets/brand/logo-lockup.svg` (derived)
- `public/favicon.svg`
- `public/favicon.ico`
- `public/favicon-32x32.png`
- `public/favicon-16x16.png`
- `public/apple-touch-icon.png`
- `public/assets/og-cover.jpg` (1200x630)

## Code integration
- `src/lib/site.ts`: BRAND_ASSETS paths -> final brand PNG assets
- `src/layouts/BaseLayout.astro`: favicon link set completed (svg/png/ico/apple)
- `src/styles/global.css`: header brand mark path updated to `/assets/brand/logo-mark.png`

## Regression contract checks
- Anchors core unchanged: `#a-propos`, `#projets`, `#contact`
- Tracking contract untouched (events/params)
- SEO public resources preserved (`robots.txt`, `sitemap.xml`, canonical/OG/Twitter)

## Build checks
- `npm run typecheck`: PASS (0 errors)
- `npm run build`: PASS

## Notes
- SVG outputs are derived wrappers from PNG source (no native vector source available).
- Fallback behavior maintained: display relies on PNG quality; SVG kept for compatibility.
