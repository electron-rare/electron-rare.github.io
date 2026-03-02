# DA Progress Log — 2026-03-02

## Contexte de la passe
- Refonte UI majeure engagée sur la home (DA-00).
- Objectif immédiat: fixer la stratégie de publication sans casser les contrats (tracking, ancres, SEO).

## Avancées capturées
- `docs/project-master-todos.md` mis à jour avec décision de sortie duale:
  - production GitHub Pages = version immédiate stable (`index.html`, `styles.css`, `script.js`, `/lab/`)
  - variante web hors GitHub = build Astro (`dist/`) préparé en option.
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
- Préparer le manifest d'évidence (`artifacts/.../`) pour la variante retenue.
- Garder la documentation de design centralisée dans ces fichiers avant toute autre livraison UI.

## Note runbook (tech)
- `npm run preflight:pages` a validé la chaine:
  - `npm run lab:build`
  - `npm run tracking:check`
  - `npm run storybook:build`
- Point d’attention observé lors du build Storybook:
  - warning `Module level directives ... "use client" was ignored` sur `framer-motion` (non bloquant pour la prod)
  - warning bundle `chunk size > 500kB` (à surveiller P2)
