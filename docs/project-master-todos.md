# Master TODO - Electron rare site

Date: 2026-03-02
Source of truth: this file

## Scope
- Site GitHub Pages (production): `index.html`, `styles.css`, `script.js`, `/lab/`
- Référence d'intégration UI/logicielle: `src/pages/index.astro`, `src/styles/global.css`, `src/components/*`
- Option web hors GitHub (en parallèle, si exigée): build Astro `dist/` publié sur autre host
- Module C interactif: `apps/lab-interactif` -> publication `lab/`
- Direction artistique active: `editorial-premium`, `warm-artistic`, `balanced`
- Acquisition: SEO + tracking GTM/GA4 + conversion CTA

## Decision Log DA (2026-03-02)
- [x] Avancée majeure: refonte UI complète validée en mode DA-00 sur `index.html` (scope web visible actuel).
- [x] Avancée majeure: plan DA (wireflow + composants + tokens) consolidé.
- [ ] Décision d'exploitation: maintien de la version GitHub Pages comme production immédiate, préparation d'un build Astro externe pour version web hors GitHub.
- [ ] Action nécessaire: aligner chaque évolution UI avec un `artifact` d'avancement daté (captures + preuve QA) pour éviter la dérive.

## Base DA / architecture
- [x] Brief DA v2.0.0 verrouille (`notes-interne/creative-direction-brief.md`)
- [x] Home reconstruite de zero en statique
- [x] Top 3 GitHub en section Projets + bouton "Voir plus" en section dediee
- [x] Module C "Lab interactif" implemente (React Router)
- [x] Routing lab adapte GitHub Pages (HashRouter)

## QA P1 (2026-03-02)
- [x] Passe visuelle responsive 390/768/1024/1440 (home + lab)
- [x] Captures + rapport QA archives (`artifacts/qa-test/2026-03-02/responsive-p1/`)
- [x] Storybook build coverage P2 execute (`npm run storybook:build`)
- [x] Checklist prod locale GA4/Search Console preparee

## Tracking / GA4
- [x] Contrat hero conserve (`cta_hero_projets`, `cta_hero_contact`, `cta_hero_profile`)
- [x] Events GitHub dedies ajoutes
- [x] Compat legacy preservee (`data-track-legacy`)
- [ ] Validation GA4 Realtime sur environnement public
- [ ] Validation GA4 DebugView (params conformes)
- [ ] Definition conversion GA4 primaire LinkedIn / secondaire Malt

## SEO / Search Console
- [x] `robots.txt` racine
- [x] `sitemap.xml` racine maj 2026-03-02
- [x] Sitemap inclut `/` et `/lab/`
- [x] Canonical + OG + Twitter sur home
- [ ] Validation Search Console (propriete + soumission sitemap + indexation)
- [ ] Validation previews sociaux (LinkedIn/Facebook)

## Roadmap web hors GitHub (optionnelle)
- [ ] Générer `dist/` Astro à partir du même contenu (`npm run build`) pour maquette/landing dédiée hors GitHub Pages.
- [x] Ajouter un plan de déploiement alternatif (Netlify/Vercel/custom) sans toucher au contrat d'ancrage (`#a-propos`, `#projets`, `#contact`) : configs `vercel.json` et `netlify.toml` + script `build:external`.
- [ ] Documenter la divergence minimale: route, headers, et variables d'environnement GA/SEO.
- [ ] Valider que le contrat de tracking reste identique entre les deux versions (labels, destinations, event_category).

## Deploy GitHub Pages
- [x] Workflow migre: static site + lab (`.github/workflows/deploy-pages.yml`)
- [x] Doc deploy mise a jour (`docs/github-pages-deploy.md`)
- [ ] Trigger deploy depuis `main` et verification URL publique
- [x] Exécuter `docs/dual-deployment-execution-plan.md` pour valider le mode “GitHub Pages + web externe” si décision produit.
- [x] Captures QA planifiées 390/768/1024/1440: `artifacts/qa-test/2026-03-02/responsive-p1/`.
- [x] Preflight local complété (2026-03-02): `npm run preflight:pages`
- [x] Build Astro vérifié (2026-03-02): `npm run build`
- [ ] Déploiement GH Pages post-lock (validation public URL + ancres + OG/robots/sitemap)

## Rituels de verification
- Avant merge: `npm run preflight:pages`
- A chaque pass majeur: mise a jour `artifacts/qa-test/<date>/...` + `evidence/manifest.json`
- Toute variation DA: mise a jour du brief avant patch UI
