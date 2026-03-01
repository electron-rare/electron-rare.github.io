# G2 Implement Evidence (v4) - Astro Studio Migration Foundation

Date: 2026-03-01

## Scope implémenté
- Mise en place stack primaire:
  - Astro + TypeScript strict
  - React integration
  - Tailwind 4 (via plugin Vite)
  - Motion
  - Radix/shadcn-like base (`Button` with Radix Slot + CVA)
  - Storybook React-Vite
- Création architecture `src/` composantisée:
  - `src/layouts/BaseLayout.astro`
  - `src/pages/index.astro`
  - sections React (`Hero`, `About`, `Projects`, `Contact`)
  - composants UI (`Button`, `Card`)
- Conservation contrat SEO/analytics:
  - metadata canonical/OG/Twitter
  - JSON-LD Person
  - contrat `dataLayer` (`event_category`, `event_label`, `destination`)
  - GTM ID `GTM-5SLM67QF` via `PUBLIC_GTM_CONTAINER_ID` fallback
- Préparation déploiement Pages via GitHub Actions:
  - `.github/workflows/deploy-pages.yml`
- Storybook full coverage initiale des composants/sections clés.

## Fichiers clés ajoutés/modifiés
- `package.json`, `package-lock.json`
- `astro.config.mjs`, `tsconfig.json`
- `src/**` (layouts/components/styles/pages)
- `.storybook/main.ts`, `.storybook/preview.ts`
- `.github/workflows/deploy-pages.yml`
- `public/robots.txt`, `public/sitemap.xml`, `public/assets/og-cover.jpg`
- `docs/github-pages-deploy.md`
- `specs/site-github-pages-spec.md`

## Note
- Le socle legacy root a ete retire de la source active et archive dans
  `artifacts/legacy-snapshot/2026-03-01/`.
