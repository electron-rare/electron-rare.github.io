# Spécification — Site web personnel adapté GitHub Pages

- **Date**: 2026-03-01
- **Gate visée**: G0 Spec Freeze
- **Responsable (agent)**: PM/Spec

## Objectif
Créer un site web personnel studio-grade, moderne et évolutif, basé sur Astro/TypeScript, prêt à être publié sur GitHub Pages via GitHub Actions.

## Contexte
Le premier bootstrap était trop générique. Le besoin utilisateur est maintenant explicite: « site adapté pour github pages et pour mon site web ».

## Stack technologique cible
- Primary stack: Astro + TypeScript + Tailwind 4 + Motion + Storybook + Radix/shadcn
- Secondary stack (si projet app plus lourd): React Router v7 + Vite + TS + Tailwind + Motion

## Direction artistique validée
- Positionnement: Pro, codeur créatif, itérateur IA, savant fou orienté création électronique et invention de systèmes
- Direction: Expérimental/noise structuré studio (`art_direction_style=experimental-noise`)
- Motion: Narratif fort (`motion_intensity=narrative-strong`)
- Atmosphère: Électrique contrastée (`color_atmosphere=electric-contrast`)
- Priorité: Impact visuel + lisibilité business (`readability_priority=balanced`)
- Langage média: Mix abstrait + photo (`media_language=abstract-photo-mix`)
- Ton typo: Sérif éditorial + sans (`typography_voice=editorial-serif-plus-sans`)

Règle de gouvernance:
- Toute variation de direction artistique passe par mise à jour explicite de `notes-interne/creative-direction-brief.md` avant modification UI.

## Exigences fonctionnelles
1. Le site expose la page d'accueil `/` via Astro (`src/pages/index.astro`) et génère un build statique (`dist/`).
2. Le site inclut une navigation ancrée: `À propos`, `Projets`, `Contact`.
3. Le site inclut une section héro claire avec proposition de valeur.
4. Le site inclut une section projets (cartes) et une section contact (liens).
5. Le site conserve le contrat tracking GTM/GA4 existant (events + paramètres).
6. Les ressources SEO publiques sont servies via `public/` (`robots.txt`, `sitemap.xml`, `assets/og-cover.jpg`).
7. Le design system est documenté dans Storybook (couverture composants et sections).

## Exigences non-fonctionnelles
- Build statique Astro sans backend runtime.
- Toolchain npm autorisée (Astro, React, Tailwind, Storybook).
- Responsive mobile/desktop.
- Accessibilité de base (contraste correct, structure sémantique, focus visible).
- Performance cible Lighthouse mobile >= 90 et SEO = 100.

## Critères d'acceptation (AC)
- AC1: Le site affiche une identité de site personnel (pas un simple placeholder technique).
- AC2: Les ancres de navigation fonctionnent (`#a-propos`, `#projets`, `#contact`).
- AC3: Le rendu mobile ne casse pas la grille de cartes.
- AC4: Déploiement GitHub Pages via GitHub Actions documenté et test local effectué.
- AC5: Storybook build passe avec la couverture des composants/sections clés.
- AC6: Contrat GTM/GA4 inchangé et vérifiable.

## Non-objectifs
- Pas de blog dynamique.
- Pas d'injection de contenu CMS/API dans ce cycle.
- Pas de formulaire backend.
- Pas d'implémentation de la stack secondaire (React Router + Vite) dans ce cycle.

## Risques
- Branding incomplet si le nom/profession ne sont pas fournis.
- Liens externes non finalisés si les profils sociaux ne sont pas donnés.

## TODO / Informations manquantes
- TODO: valider les événements GA4 en production (Realtime + conversions LinkedIn/Malt).
- TODO: connecter Google Search Console et vérifier l'indexation `sitemap.xml`.
- TODO: vérifier l'aperçu social en production (LinkedIn/Facebook).
- TODO: mesurer et réduire les chunks client les plus lourds si nécessaire.
