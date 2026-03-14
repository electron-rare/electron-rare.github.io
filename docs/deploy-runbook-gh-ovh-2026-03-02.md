# Deploy Runbook - Historical Snapshot

Updated: 2026-03-14
Status: historical / replaced

## Pourquoi ce fichier reste

Il documentait un ancien flux transitoire melangeant:
- GitHub Pages
- OVH
- references au `lab`
- anciennes ancres et anciennes hypotheses produit

## Remplacement actif

Utiliser maintenant:
- `docs/ovh-ftp-preview-solution-2026-03-14.md`
- `docs/SPRINT-PLAYBOOK-2026-03-02.md`
- `docs/project-master-todos.md`

## Etat courant a retenir

- deploy preview: GitHub Actions `deploy-ovh-ftp.yml` avec `target=preview`
- deploy production: GitHub Actions `deploy-ovh-ftp.yml` avec `target=production`
- verification publique via `scripts/verify-public-target.mjs`
- `lab` non public
- source active du produit: `src/` Astro
