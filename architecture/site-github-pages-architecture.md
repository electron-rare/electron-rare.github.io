# Architecture — Site personnel statique GitHub Pages

- **Date**: 2026-03-01
- **Gate visée**: G1 Arch Freeze
- **Responsable (agent)**: Architect

## Vue d'ensemble
Architecture front statique en 2 fichiers:
- `index.html`: structure sémantique (header/nav/main/sections/footer)
- `assets/styles.css`: thème, layout responsive, composants visuels

## Interfaces
- **Entrée**: navigateur web moderne
- **Sortie**: rendu d'un site vitrine personnel
- **Hébergement**: GitHub Pages (branch `main`, root)

## Structure UI
- Bloc `hero` avec CTA.
- Section `#a-propos` pour la présentation.
- Section `#projets` avec grille de cartes.
- Section `#contact` avec liens sortants.

## Contraintes techniques
- Aucun JS requis pour la version initiale.
- Chemins relatifs uniquement (`assets/styles.css`).
- CSS pur (variables, grid, media queries).

## Budgets
- Poids page + CSS < 80KB (source non compressée).
- Temps de chargement perçu < 1s sur connexion standard (contenu statique).

## Validation
- Smoke test HTTP local.
- Vérification ancres + rendu responsive.
- Capture visuelle de preuve.
