# Index - Recherche documentaire

Date: 2026-03-02
But: point d'entree unique pour retrouver la doc (DA, UX, tracking, SEO, deploy, evidence).

Note: `notes-interne/` est un dossier local prive (gitignore). Les liens vers ce dossier peuvent etre non resolubles sur GitHub.

## Ordre de verite (anti-derive)

1. `notes-interne/creative-direction-brief.md` (axes DA verrouilles)
2. `specs/site-github-pages-spec.md` (contrats publics: anchors, tracking, SEO)
3. `docs/project-master-todos.md` (source of truth execution + gates)
4. `docs/github-pages-deploy.md` (deploiement Pages + checklist post-deploy)
5. `docs/acquisition-seo-plan.md` (plan 7j/30j acquisition + QA)

## Actif (a consulter en premier)

- [project-master-todos.md](./project-master-todos.md) - backlog et gates (source de verite execution)
- [site-github-pages-spec.md](../specs/site-github-pages-spec.md) - spec + contrats publics (anchors/tracking/SEO)
- [creative-direction-brief.md](../notes-interne/creative-direction-brief.md) - brief DA (axes)
- [creative-direction-guidelines.md](../notes-interne/creative-direction-guidelines.md) - guidelines DA (composition, motion, conversion)
- [wireflow-conversion-da00.md](./wireflow-conversion-da00.md) - wireflow desktop/mobile + user flow CTA
- [da-01-implementation-backlog.md](./da-01-implementation-backlog.md) - mapping sections/tokens/interaction + gates DA-01
- [da-progress-log-2026-03-02.md](./da-progress-log-2026-03-02.md) - journal des avancées DA de la session courante

## Brand (logo + assets)

- [logo-selection-2026-03-02.md](../notes-interne/logo-selection-2026-03-02.md) - gagnant + backups (integration web)
- [logo-integration-runbook.md](./logo-integration-runbook.md) - procedure d'integration (formats, paths, verifs)
- [logo-prompts-electron-rare-v2-github.md](../notes-interne/logo-prompts-electron-rare-v2-github.md) - prompts pack v2 (reference)
- [logo-prompts-electron-rare.md](../notes-interne/logo-prompts-electron-rare.md) - prompts pack historique (archive)
- [asset-prompts-carnet-labo-electronique-v1.md](../notes-interne/asset-prompts-carnet-labo-electronique-v1.md) - prompts pack assets DA (labo electronique)

## Acquisition / SEO / Tracking

- [acquisition-seo-plan.md](./acquisition-seo-plan.md) - plan P0/P1 + roadmap 7j/30j
- [github-pages-deploy.md](./github-pages-deploy.md) - checklist post-deploy + tracking contract
- [ga4-gtm-setup-sprint-c-2026-03-02.md](./ga4-gtm-setup-sprint-c-2026-03-02.md) - mapping GTM/GA4 exact des nouveaux events Sprint C
- `scripts/validate-tracking.mjs` - validation contrat tracking (CLI)
- `src/lib/tracking.ts` - source de verite implementation events

## Recherche (references et recoupements)

- [ui-ux-da-research-2026-03-02.md](../notes-interne/ui-ux-da-research-2026-03-02.md) - constats + gates UX (anti-blocage)
- [references-web-da-maker-ux-2026-03-01.md](../notes-interne/references-web-da-maker-ux-2026-03-01.md) - references creatives + UX (maker/studio)
- [da-benchmark-industrie-creative-2026-03-02.md](./da-benchmark-industrie-creative-2026-03-02.md) - benchmark studios electronique/industrie/innovation (FR + international)
- [recherche-web-clement-saillant.md](../notes-interne/recherche-web-clement-saillant.md) - recoupements web public (identites/URLs)
- [stack-studio-open-source-2026-03-01.md](../notes-interne/stack-studio-open-source-2026-03-01.md) - choix stack + arbitrages
- [top8-ui-reference-todos.md](./top8-ui-reference-todos.md) - TODOs UI references (historique utile)

## Evidence / QA

- [da00-home-figma-capture-log.md](../artifacts/figma-capture/2026-03-02/da00-home-figma-capture-log.md) - captures Figma home (390/768/1024/1440) + claims.
- [Home_ElectronRare_DA00_2026-03-02_Final](https://www.figma.com/design/fnqOdDOU97v7E27LxkV7cn/Home_ElectronRare_DA00_2026-03-02_Final?node-id=0-5&t=1hMMzGSVdlsSMCI8-0) - artifact Figma final (390/768/1024/1440).
- `artifacts/qa-test/` - captures, rapports, evidence par date
- `evidence/manifest.json` - manifest evidence

## Archive / Historique

- [migration-legacy-to-astro.md](./migration-legacy-to-astro.md) - migration legacy -> Astro (historique, pas la voie de publication actuelle)
- `artifacts/legacy-snapshot/` - snapshot legacy (reference)

## Regles de maintenance (rapides)

- Si tu changes une decision DA: update `notes-interne/creative-direction-brief.md` avant tout patch UI.
- Si tu changes tracking: update `specs/site-github-pages-spec.md` + `docs/github-pages-deploy.md`, puis `npm run tracking:check`.
- Si tu changes le deploy: update `.github/workflows/deploy-pages.yml` + `docs/github-pages-deploy.md`.
