# Docs README - Source de vérité

Updated: 2026-03-14
Status: active
Repo: `/home/zacus/electron-rare-preview-ovh`

## Etat réel du projet

- Site Astro publie sur OVH via GitHub Actions FTP
- Preview publique: `https://www.lelectronrare.fr/preview/`
- Production publique: `https://www.lelectronrare.fr/`
- Surface publique active: `/`, `/formation/`, `/mentions-legales/`, `robots.txt`, `sitemap.xml`
- Le lab n'est plus une surface publique produit
- Positionnement actif:
  - systemes electroniques specifiques
  - familles visibles: electronique, automatisme, energie, stockage, optimisation
  - l'embarque reste une competence, pas le titre principal
  - les projets multi-techniques s'appuient sur les partenaires adaptes

## Lire dans cet ordre

1. `project-master-todos.md`
2. `design-memory-2026-03-14-white-contrast.md`
3. `da-01-implementation-backlog.md`
4. `EXECUTION-IMMÉDIATE-2026-03-02.md`
5. `SPRINT-PLAYBOOK-2026-03-02.md`
6. `ovh-ftp-preview-solution-2026-03-14.md`

## Docs actives

- `project-master-todos.md`
  - backlog court terme, priorites, etat reel
- `design-memory-2026-03-14-white-contrast.md`
  - memoire DA et positionnement actif
- `da-01-implementation-backlog.md`
  - backlog de consolidation design / UX / contenu
- `EXECUTION-IMMÉDIATE-2026-03-02.md`
  - resume executif et ordre de sortie
- `SPRINT-PLAYBOOK-2026-03-02.md`
  - commandes et checks operatoires
- `ovh-ftp-preview-solution-2026-03-14.md`
  - runbook de deploy OVH FTP via GitHub Actions
- `migration-legacy-to-astro.md`
  - regle de non-retour vers le legacy

## Docs historiques a ne plus traiter comme source de vérité

- archive principale:
  - `docs/archive/2026-03-legacy-plans/README.md`
  - `docs/archive/2026-03-legacy-plans/`

Contenu archive:
- anciens runbooks GitHub Pages et double hebergement
- audits et quick references de debut mars 2026
- variantes Figma, wireflows, benchmarks et backlogs d'assets
- anciens snapshots KPI, GTM et copy sheets

Ces documents restent utiles comme archive de contexte, mais ils ont ete ecrits a un moment ou:
- GitHub Pages etait encore traite comme prod active
- le lab etait encore public
- le positionnement etait plus etroit ou plus experimental

## Regles de mise à jour

- Toute nouvelle decision produit ou deploiement doit d'abord mettre a jour `project-master-todos.md`
- Toute decision de positionnement, DA ou surface publique doit mettre a jour `design-memory-2026-03-14-white-contrast.md`
- Toute instruction operatoire doit etre recalee dans `SPRINT-PLAYBOOK-2026-03-02.md`
- Toute doc qui devient trompeuse doit etre soit mise a jour, soit marquee comme historique
