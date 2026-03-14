# DA Progress Log — 2026-03-02

> Statut 2026-03-14: journal historique.
> Conserver comme archive de transition, pas comme memo de pilotage actif.
> Memoire active: `docs/design-memory-2026-03-14-white-contrast.md`.

## Contexte de la passe
- Refonte UI majeure engagée sur la home (DA-00).
- Objectif immédiat: fixer la stratégie de publication sans casser les contrats (tracking, ancres, SEO).

## Capture Figma MCP (Home)
- Capture déclenchée et validée via MCP Figma le `2026-03-02` (captureId: `5a2314db-6659-4171-9360-1b04d801f32a`).
- Résultat: fichier existant mis à jour: [Home_ElectronRare_DA00_2026-03-02_Final](https://www.figma.com/design/fnqOdDOU97v7E27LxkV7cn)
- Mode de capture: `existingFile` dans Figma + script de capture local injecté temporairement (non versionné).

## Avancées capturées
- `docs/project-master-todos.md` mis à jour avec décision de sortie duale:
  - production GitHub Pages = version immédiate stable (`index.html`, `styles.css`, `script.js`, `/lab/`)
  - variante web hors GitHub = build Astro (`dist/`) préparé en option.
- `assets/da/` et `public/assets/da/` ajoutés avec 6 textures de variantes (v1-v6) pour enrichir l’overlay visuel GH + Astro.
- [Reset] `notes-interne/creative-direction-brief.md` a été basculé en v2.2.0 (mode innovant) et la grille V1→V10 est réinitialisée.
- `docs/figma-da-six-variants-github.md` et `docs/figma-da-v1-v10-innovation-reset.md` mis à jour: reset complet V1→V10 + priorisation de passage.
- `docs/da-01-implementation-backlog.md` mis à jour:
  - état d'avancement DA
  - gates QA élargies (`preflight:pages`, `tracking:check`)
  - section "Version duale (prod immédiate + web hors GitHub)".
- `docs/github-pages-deploy.md` mis à jour:
  - section "Stratégie de déploiement duale"
  - rappel d'invariance de contrat entre versions.
- Figma DA-00 (captures) partiellement consolidées:
  - captures desktop/mobile réalisées pour 390/768/1024/1440 (artifacts existants)
  - preuves conservées: [artifacts/figma-capture/2026-03-02/da00-home-figma-capture-log.md](../artifacts/figma-capture/2026-03-02/da00-home-figma-capture-log.md)
  - fichier final Figma: [Home_ElectronRare_DA00_2026-03-02_Final](https://www.figma.com/design/fnqOdDOU97v7E27LxkV7cn/Home_ElectronRare_DA00_2026-03-02_Final?node-id=0-5&t=1hMMzGSVdlsSMCI8-0)

## Décision d'architecture retenue
- Court terme: publier en priorité sur GitHub Pages (flux stable de release).
- Moyen terme: activer une version web externe Astro en parallèle uniquement si roadmap / besoins d'hébergement l'exigent.
- Contraintes permanentes: conserver `#a-propos`, `#projets`, `#contact`, CTA et contrat GA4 identiques.

## TODO immédiat (suite de sprint)
- [x] Vérification pré-vol technique terminée: `npm run preflight:pages`, `npm run build`.
- [x] Finaliser la preuve visuelle `390 / 768 / 1024 / 1440` sur la version GA publiée.
- [x] Normaliser l’artefact Figma en un seul fichier final (nommage artboards + variantes) à partir des captures existantes.
- Vérifier GA4 Realtime + DebugView avec events cibles.
- Trancher maintenant entre `v4`, `v1`, `v7`, `v9` avec ordre de test:
  - 1) `v4` (rupture forte),
  - 2) `v1` (clarité + structure),
  - 3) `v7` (conversion-sécurisée),
  - 4) `v9` (positionnement narratif).
- QA 4x4 à lancer pour ces variantes; artefact de suivi:
  - [artifacts/da-qa/2026-03-02/gh-variants-v8-v11-qa-report.md](../artifacts/da-qa/2026-03-02/gh-variants-v8-v11-qa-report.md) (legacy QA)
- Préparer le manifest d'évidence (`artifacts/.../`) pour la variante retenue.
- Garder la documentation de design centralisée dans ces fichiers avant toute autre livraison UI.

## Decision de style (fin d'arbitrage)
- Variante retenue: **Carnet de labo electronique**.
- Fichier Figma actif: `https://www.figma.com/design/Wzk5HhOqRHMhflwz0rpv7w`
- Capture de reference retenue: `e8505835-a80e-48b8-beb4-818e63db9535`
- Actifs visuels design retenus:
  - `tmp/figma-seeds/assets/mesure-rig.svg`
  - `tmp/figma-seeds/assets/pcb-board-hero.svg`
- Prochaine phase: implémentation UI sur scope GitHub Pages (`index.html`, `styles.css`) sans rupture des contrats publics.

## Implementation code (scope GitHub Pages)
- `index.html` bascule en direction active (default `v12`) + hero "Carnet de labo electronique".
- `styles.css` ajoute le preset `v12` (palette/lumiere/contrastes) + layout hero asset-first.
- Assets de production ajoutés:
  - `assets/da/mesure-rig.svg`
  - `assets/da/pcb-board-hero.svg`
  - `public/assets/da/mesure-rig.svg`
  - `public/assets/da/pcb-board-hero.svg`
- Contrat tracking vérifié: `npm run tracking:check` OK.
- Prompt pack assets cree pour generation image:
  - `notes-interne/asset-prompts-carnet-labo-electronique-v1.md`
  - batch prete a lancer: `tmp/imagegen/carnet-labo-assets-batch-v1.jsonl`

## Note runbook (tech)
- `npm run preflight:pages` a validé la chaine:
  - `npm run lab:build`
  - `npm run tracking:check`
  - `npm run storybook:build`
- Point d’attention observé lors du build Storybook:
  - warning `Module level directives ... "use client" was ignored` sur `framer-motion` (non bloquant pour la prod)
  - warning bundle `chunk size > 500kB` (à surveiller P2)

## Update execution (2026-03-02 13:56)
- Direction active appliquee sur la home Astro: **Carnet de labo electronique vivant** (variant `v12` renforce).
- Mise en oeuvre UI:
  - ajout d'un strip "etat instruments" dans le hero (telemetrie visible et lisible).
  - surcouche visuelle `v12` renforcee: grille electronique, bus de signal, contraste panneaux/nav.
  - accentuation de la carte labo (images assets + captions + etat signal) sans changer les ancres/CTA.
- Verification technique:
  - `npm run build` OK.
  - `npm run deploy:web:sftp` OK (OVH mutualise).
  - verification distante SFTP:
    - `index.html` update
    - `_astro/Hero.D8ngAjmO.js` update
    - `_astro/index.DrEuSoRX.css` update

## Update execution (2026-03-02 14:07)
- Capture Figma MCP de la home `v12` injectee dans le fichier actif:
  - fichier: `Wzk5HhOqRHMhflwz0rpv7w`
  - captureId: `6bbd4ed4-522b-4564-9628-293461a662f3`
  - statut: **completed**
- QA responsive pass2 effectuee sur le domaine OVH:
  - captures: `artifacts/qa-test/2026-03-02/responsive-v12-pass2/*.png`
  - rapport: `artifacts/qa-test/2026-03-02/responsive-v12-pass2/qa-report.md`
  - verdict: **OK** (breakpoints + invariants anchors/CTA)
