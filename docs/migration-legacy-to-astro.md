# Migration Legacy -> Astro (Source of Truth)

Date: 2026-03-01
Status: active memo for no-return rule

## Décision
Le socle legacy HTML/CSS root est figé et archivé. La source de vérité active est désormais:
- contenu/page: `src/pages/index.astro`
- styles: `src/styles/global.css`, `src/styles/home-workbench.css`
- SEO publics: `src/lib/site.ts`, `src/pages/robots.txt.ts`, `src/pages/sitemap.xml.ts`, `public/assets/og-cover.jpg`
- build/deploy: `dist/` via GitHub Actions FTP sur OVH
- pilotage documentaire: `docs/README.md`, `docs/project-master-todos.md`

## Archive legacy
Snapshot créé dans:
- `artifacts/legacy-snapshot/2026-03-01/index.legacy.html`
- `artifacts/legacy-snapshot/2026-03-01/styles.legacy.css`
- `artifacts/legacy-snapshot/2026-03-01/og-cover.legacy.jpg`
- `artifacts/legacy-snapshot/2026-03-01/robots.legacy.txt`
- `artifacts/legacy-snapshot/2026-03-01/sitemap.legacy.xml`

## Règle no-drift
- Ne pas réactiver le legacy pour les changements produit.
- Toute évolution UI/SEO doit passer par Astro (`src/` + `public/`).
- Ne pas reintroduire GitHub Pages comme prod active dans les docs.
- Ne pas reexposer `lab` comme surface publique sans decision produit explicite.
