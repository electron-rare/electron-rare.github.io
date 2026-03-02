# G3 Verification v9 - Production Readiness (local + external gates)

Date: 2026-03-01
Owner: QA/Test

## Local gates
- [x] `npm run typecheck` passe (0 erreur)
- [x] `npm run build` passe (site statique genere)
- [x] `public/robots.txt` present et coherent
- [x] `public/sitemap.xml` present et coherent
- [x] Contrat tracking front present (`src/lib/tracking.ts`)
- [x] GTM default present (`GTM-5SLM67QF`)
- [x] Canonical + OG/Twitter tags presents (`src/layouts/BaseLayout.astro`)

## External gates (a valider en prod)
- [ ] GA4 Realtime: events recus apres clic CTA
- [ ] GA4 DebugView: `event_category/event_label/destination` corrects
- [ ] GA4 conversions configurees (LinkedIn primaire, Malt secondaire)
- [ ] Search Console: propriete verifiee + sitemap soumis
- [ ] Social previews: LinkedIn/Facebook debug passes

## Notes
- QA Playwright locale effectuee sur 390/768/1024/1440 avec themes dark/light/high-contrast.
- Pipeline logo prepare (`notes-interne/logo-prompts-electron-rare.md`, `tmp/imagegen/electron-rare-logo-batch.jsonl`), generation finale en attente de cle API.
