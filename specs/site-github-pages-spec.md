# Spécification — Site web personnel adapté GitHub Pages

- **Date**: 2026-03-01
- **Gate visée**: G0 Spec Freeze
- **Responsable (agent)**: PM/Spec

## Objectif
Créer un site web personnel statique, élégant et simple à maintenir, prêt à être publié sur GitHub Pages sans pipeline de build.

## Contexte
Le premier bootstrap était trop générique. Le besoin utilisateur est maintenant explicite: « site adapté pour github pages et pour mon site web ».

## Exigences fonctionnelles
1. Le site expose `index.html` à la racine du dépôt.
2. Le site inclut une navigation ancrée: `À propos`, `Projets`, `Contact`.
3. Le site inclut une section héro claire avec proposition de valeur.
4. Le site inclut une section projets (cartes) et une section contact (liens).
5. Tous les liens d'assets utilisent des chemins relatifs compatibles GitHub Pages.

## Exigences non-fonctionnelles
- 100% statique (HTML + CSS), sans dépendances npm.
- Responsive mobile/desktop.
- Accessibilité de base (contraste correct, structure sémantique, focus visible).

## Critères d'acceptation (AC)
- AC1: Le site affiche une identité de site personnel (pas un simple placeholder technique).
- AC2: Les ancres de navigation fonctionnent (`#a-propos`, `#projets`, `#contact`).
- AC3: Le rendu mobile ne casse pas la grille de cartes.
- AC4: Déploiement GitHub Pages documenté et test local effectué.

## Non-objectifs
- Pas de blog dynamique.
- Pas d'injection de contenu CMS/API.
- Pas de formulaire backend.

## Risques
- Branding incomplet si le nom/profession ne sont pas fournis.
- Liens externes non finalisés si les profils sociaux ne sont pas donnés.

## TODO / Informations manquantes
- TODO: remplacer « Votre Nom » par votre identité réelle.
- TODO: renseigner vos vrais liens (GitHub, LinkedIn, email).
- TODO: ajouter vos projets réels dans la section dédiée.
