# Runbook - Integration logo (post generation)

Date: 2026-03-02

## Objectif
Integrer le logo final dans le site sans regressions SEO/UI.

## Source de selection
- Source officielle: `output/VALIDE DA`
- Decision: voir `notes-interne/logo-selection-2026-03-02.md`
- Winner: `001-create-a-vector-logo-for-electron-rare-with-an-er-monogram-b.png`

## Emplacements cibles
- Header brand mark: `public/assets/brand/logo-mark.png`
- Header lockup (optionnel): `public/assets/brand/logo-lockup.png`
- SVG derives: `public/assets/brand/logo-mark.svg`, `public/assets/brand/logo-lockup.svg`
- Favicon: `public/favicon.svg`, `public/favicon.ico`, `public/favicon-32x32.png`, `public/favicon-16x16.png`, `public/apple-touch-icon.png`
- OG cover: `public/assets/og-cover.jpg` (1200x630)

## Fichiers a mettre a jour
- `src/styles/global.css` (classe `.site-brand::before`)
- `src/layouts/BaseLayout.astro` (favicon links)
- `src/lib/site.ts` (`BRAND_ASSETS`)
- `public/assets/brand/*` (assets finals)

## Checks obligatoires
1. Lisibilite logo a 24px/32px/48px
2. Contraste logo dark/light/high-contrast
3. Aucune casse layout mobile 390px
4. Favicon charge sans 404
5. OG image validee via social debuggers

## Procedure rapide
1. Copier les 3 fichiers retenus dans `tmp/brand-selection/` pour freeze.
2. Produire le pack final dans `public/assets/brand/` (PNG + SVG derives).
3. Produire le pack favicon dans `public/`.
4. Regenerer `public/assets/og-cover.jpg`.
5. Pointer `site.ts` + `BaseLayout` + `global.css` vers les nouveaux assets.
6. Executer `npm run typecheck && npm run build`.
7. Verifier en preview locale puis en production.
8. Archiver la preuve dans `artifacts/qa-test/<date>/` et mettre a jour `evidence/manifest.json`.
