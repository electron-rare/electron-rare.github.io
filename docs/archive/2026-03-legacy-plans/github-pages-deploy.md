# GitHub Pages Deploy - Historical Note

Updated: 2026-03-14
Status: historical / do not use as active runbook

## Ce document n'est plus la source de vérité

Le projet n'est plus pilote comme:
- un site GitHub Pages en production
- un site public avec module `lab` expose

La production active est maintenant:
- site Astro
- heberge sur OVH
- deploye via GitHub Actions FTP
- preview publique sous `/preview/`
- production publique a la racine

## Docs a utiliser a la place

- `docs/README.md`
- `docs/project-master-todos.md`
- `docs/SPRINT-PLAYBOOK-2026-03-02.md`
- `docs/ovh-ftp-preview-solution-2026-03-14.md`

## Rappel historique

Cette note existe pour conserver la trace du passage:
- d'un modele GitHub Pages / static root
- vers un modele Astro + OVH FTP

Le `lab` reste un artefact de developpement interne, mais n'est plus une surface publique produit.

## Regle

Ne pas relancer de workflow ni de runbook GitHub Pages depuis ce document.
