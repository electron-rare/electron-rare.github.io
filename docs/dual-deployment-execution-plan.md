# Plan d’exécution — Double version (GitHub Pages + web externe)

Date: 2026-03-02
Objectif: activer proprement une variante web hors GitHub sans casser la version stable GitHub Pages.

## 1) Référentiel d’exécution

- Référence de vérité DA: `notes-interne/creative-direction-brief.md`
- Contrats publics (ancres/tracking/SEO): `specs/site-github-pages-spec.md`
- Gates techniques: `scripts/validate-tracking.mjs`
- Source technique:  
  - production immediate: `index.html`, `styles.css`, `script.js`, `lab/`  
  - évolution studio: `src/pages/index.astro`, `src/styles/global.css`, composants TSX

## 2) Stratégie de déploiement (choix)

### Baseline (conservée)
- Production immédiate = GitHub Pages via `index.html` statique.
- Aucun régression fonctionnelle ni visuelle sur cette version.

### Variante Web externe (en parallèle)
- Build web hors GitHub = Astro `dist/` (issue de la même base contentuelle DA).
- Utilisation recommandée: Vercel/Netlify (routes directes sur `/`).

## 3) Plan opérationnel par phases

### Phase A — Préparation (1h)
- [x] Valider que les sections/IDs core existent sur les 2 cibles:
  - `#a-propos`
  - `#projets`
  - `#contact`
- [x] Vérifier que les contrats events GA4 sont identiques côté code source (nom + params).
- [x] Valider que le plan d’assets SEO (robots/sitemap/OG/favicons) est prêt pour l’hôte externe.

### Phase B — Stabilisation GitHub Pages (0.5h)
- [x] Exécuter: `npm run lab:build`, `npm run tracking:check`, `npm run storybook:build`, `npm run preflight:pages`.
- [ ] Vérifier sur local static preview (fallback) que `index.html` reste inchangé.
- [ ] Déployer GH Pages via `main` + workflow `.github/workflows/deploy-pages.yml`.
- [ ] Contrôles post-déploiement:
  - `https://electron-rare.github.io/`
  - `https://electron-rare.github.io/lab/`
  - ancres core, robots, sitemap, prévisualisation OG.

### Phase C — Préparation web externe (1h)
- [x] Lancer build Astro de référence: `npm run build`.
- [x] Vérifier localement `dist/index.html` (ou host preview) et cohérence visuelle.
- [x] Vérifier que les CTA et paramètres GA4 sont bien émis comme GitHub Pages.
- [ ] Documenter la cible d’URL externe et le `base/site` approprié si besoin.

### Phase D — Déploiement alternatif (0.5h)
- [ ] Déployer `dist/` sur hôte externe (Vercel/Netlify/custom) via `npm run build:external`.
- [ ] Vérifier accessibilité routes:
  - `/`
  - ancres de navigation en-fragmente
  - `/lab/` (si exposée selon choix produit)
- [ ] Contrôles SEO: robots/sitemap (version externe si nécessaire), canonical, OG/Twitter.

### Phase E — Parité de preuve (1h)
- [ ] QA visuelle 390/768/1024/1440 sur les 2 versions.
- [ ] Tracking check:
  - GA4 Realtime (events principaux)
  - DebugView (`event_category`, `event_label`, `destination`)
- [ ] Archive:
  - captures QA dans `artifacts/.../`
  - manifest mis à jour (`evidence/manifest.json`)
- [ ] Verrouiller décision de routage principal: garder GH Pages ou activer web externe.

### Section complémentaire — Capture DA Figma (Home)
- Captures et instructions de handoff:
  - [artifacts/figma-capture/2026-03-02/da00-home-figma-capture-log.md](../artifacts/figma-capture/2026-03-02/da00-home-figma-capture-log.md)
- Consolidation finale disponible: [Home_ElectronRare_DA00_2026-03-02_Final](https://www.figma.com/design/fnqOdDOU97v7E27LxkV7cn/Home_ElectronRare_DA00_2026-03-02_Final?node-id=0-5&t=1hMMzGSVdlsSMCI8-0)
- [x] Captures desktop/mobile obtenues (390/768/1024/1440) et loggées.
- [x] Consolider les 4 captures dans un seul fichier final (1 artboard par breakpoint).
- [x] Archiver le lien Figma final dans ce plan + dans `docs/recherche-documentaire-index.md`.

## 4) Règles de non-régression (non négociables)
- Aucune divergence visuelle majeure non tracée dans les docs DA.
- Uniquement la version choisie est promue comme “production”.
- Le contrat DA reste identique: anchors + CTAs + tracking + contraste/conversion.
- Pas de modification de tracking contract sans passage obligatoire de `tracking:check`.

## 5) Rôles / ownership proposé
- Pilotage DA: maintenu dans `docs/project-master-todos.md` + ce plan.
- QA: validation viewport + tracking + SEO.
- Livraisons: un seul merge valide une seule version à la fois.

## 6) Critères d’acceptation
- 1 version publiée stable (GH Pages) + 1 build externe validé ou explicitement noté “en attente”.
- Les 3 ancres core fonctionnent sur les deux vues.
- Les events principaux GA4 passent avec paramètres conformes.
- Aucune régression de navigation, CTA, ni contraste.
