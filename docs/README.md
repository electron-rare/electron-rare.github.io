# Docs README - Source de vérité

Updated: 2026-03-19
Status: active
Repo: /root/electron-rare-site

## Etat réel du projet

- Site Astro public en production sur Photon (Docker SSR + Traefik).
- URL publique active: https://www.lelectronrare.fr/ (route www.lelectronrare.fr et lelectronrare.fr).
- Exposition opérationnelle vérifiée: /, /formation/, /mentions-legales/, /404, robots.txt, sitemap.xml.
- Point de soumission lead: POST `/api/submit-lead` (route SSR -> Frappe CRM Lead), avec fallback automatique vers le CRM custom tant que nécessaire.
- Déploiement local d’atelier public retiré de la surface visible.
- Positionnement actif:
  - systemes electroniques specifiques
  - familles visibles: electronique, automatisme, energie, stockage, optimisation
  - l'embarque reste une compétence de support, pas la promesse principale
- Hero actif:
  - titre: Systemes electroniques specifiques, du besoin au livrable fiable
  - visuel: oscilloscope en plan rapproche, lisibilite white-contrast
  - surface de marque conforme au manifeste de production

## Lire dans cet ordre

1. project-master-todos.md
2. feature-map-ecosystem.md
3. docs/lead-integration-spec-2026-03-19.md
4. design-memory-2026-03-14-white-contrast.md
5. da-01-implementation-backlog.md
6. EXECUTION-IMMÉDIATE-2026-03-02.md
7. SPRINT-PLAYBOOK-2026-03-02.md
8. oss-lead-form-veille-2026-03-19.md

## Docs actives

- project-master-todos.md
  - backlog court terme, priorites, etat reel
- lead-integration-spec-2026-03-19.md
  - spec d'intégration du formulaire contact vers Frappe CRM + fallback legacy
- oss-lead-form-veille-2026-03-19.md
  - veille OSS sur alternatives formulaire/lead + recommandation
- feature-map-ecosystem.md
  - cartographie produit/processus + diagrammes Mermaid
- design-memory-2026-03-14-white-contrast.md
  - memoire DA et positionnement actif
- da-01-implementation-backlog.md
  - backlog de consolidation design / UX / contenu
- EXECUTION-IMMÉDIATE-2026-03-02.md
  - resume executif et ordre de sortie
- SPRINT-PLAYBOOK-2026-03-02.md
  - runbook de commandes et checks operatoires
- pipeline-commercial/crm-open-source-benchmark.md
  - veille OSS CRM/backoffice + décision de choix
- pipeline-commercial/AGENTS_AND_SKILLS_MATRIX_2026-03-19.md
  - répartition agents, missions, plan de lot et priorités

## Docs historiques a ne plus traiter comme source de vérité

- archive principale:
  - docs/archive/2026-03-legacy-plans/README.md
  - docs/archive/2026-03-legacy-plans/

Contenu archive:
- anciens runbooks GitHub Pages / FTP
- audits et quick references de debut mars 2026
- variantes Figma, wireflows, benchmarks et backlogs d'assets
- historiques KPI, GTM et copy sheets

Ces documents restent utiles pour contexte, mais ne gouvernent plus les opérations actives.

## Regles de mise à jour

- Toute nouvelle decision produit ou deploiement doit d'abord mettre a jour project-master-todos.md.
- Toute decision de positionnement, DA ou surface publique doit mettre a jour design-memory-2026-03-14-white-contrast.md.
- Toute instruction operatoire doit etre recalee dans SPRINT-PLAYBOOK-2026-03-02.md.
- Toute doc devenue trompeuse doit etre soit mise a jour, soit archivee.
