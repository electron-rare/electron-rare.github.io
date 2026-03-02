# Specification — Site web personnel adapte GitHub Pages

- **Date**: 2026-03-02
- **Gate visee**: G0 Spec Freeze
- **Responsable (agent)**: PM/Spec

## Objectif
Créer un site web personnel studio-grade, moderne et évolutif, basé sur Astro/TypeScript, prêt à être publié sur GitHub Pages via GitHub Actions.

## Contexte
Le premier bootstrap était trop générique. Le besoin utilisateur est explicite: site personnel studio, orienté acquisition, avec DA forte et parcours conversion mesurable.

## Stack technologique cible
- Primary stack: Astro + TypeScript + Tailwind 4 + Motion + Storybook + Radix/shadcn
- Secondary stack (si projet app plus lourd): React Router v7 + Vite + TS + Tailwind + Motion

## Direction artistique validée
- Positionnement: Pro, codeur créatif, itérateur IA, savant fou orienté création électronique et invention de systèmes
- Direction: Editorial premium studio (`art_direction_style=editorial-premium`)
- Motion: Subtile et précise (`motion_intensity=subtle-precise`)
- Atmosphère: Chaude atelier (`color_atmosphere=warm-artistic`)
- Priorité: Équilibrée (`readability_priority=balanced`)
- Langage média: Mix abstrait + photo (`media_language=abstract-photo-mix`)
- Ton typo: Display + sans (`typography_voice=display-plus-sans`)
- Axe sprint DA-00: atelier premium (ivoire/encre/cuivre) + accents techniques mesurés

Règle de gouvernance:
- Toute variation de DA passe par mise à jour explicite de `notes-interne/creative-direction-brief.md` avant modification UI.

## Structure cible (zoning DA-00)

### Desktop 1440
1. Header 2 niveaux (nav + bus posture studio)
2. Hero + Identité
3. Systèmes (Flow + Pipeline + À propos)
4. Production (Projets + Timeline + Lab Notes)
5. Conversion (preuves + contact)
6. Footer (knowledge/protocoles/contact pro)

### Mobile 390
1. Hero + CTA primaire
2. Identité + preuve courte
3. Flow/Pipeline vertical
4. Projets + Timeline
5. Lab Notes
6. Preuves + Contact

## Contrats publics à préserver

### Navigation/URL
- Ancres core inchangées: `#a-propos`, `#projets`, `#contact`
- Les labels UI sont libres tant que les IDs restent stables
- Module interactif publie sous `/lab/` avec routing hash-compatible:
  - `/lab/`
  - `/lab/#/signals`
  - `/lab/#/prototypes`

### Tracking GTM/GA4
- Événements conservés:
  - `cta_hero_projets`
  - `cta_hero_contact`
  - `cta_hero_profile`
  - `outbound_linkedin_project`
  - `outbound_linkedin_contact`
  - `outbound_malt_contact`
  - `outbound_bandcamp_project`
  - `outbound_bandcamp_contact`
  - `outbound_github_project`
  - `outbound_github_contact`
- Événements GitHub dédiés (extension DA/P1):
  - `outbound_github_project_rtc_bl_phone`
  - `outbound_github_project_zacus`
  - `outbound_github_project_site`
  - `outbound_github_lab_more`
  - `cta_lab_interactif_open`
- Paramètres obligatoires conservés:
  - `event_category=engagement`
  - `event_label`
  - `destination`

### SEO/public assets
- `public/robots.txt`
- `public/sitemap.xml`
- canonical + OG + Twitter

## Exigences fonctionnelles
1. Le site expose la page d'accueil `/` via `index.html` (statique) et conserve une sortie publiable GitHub Pages.
2. Le site inclut une navigation ancrée core: `#a-propos`, `#projets`, `#contact`.
3. Le site inclut un Hero à impact immédiat et proposition de valeur claire.
4. Le site inclut sections système/production/contact cohérentes avec la structure cible.
5. Le site conserve le contrat tracking GTM/GA4 existant.
6. Les ressources SEO publiques sont servies via `public/`.
7. Le module interactif `/lab/` est implémenté en Vite + React Router et déployable indépendamment.

## Exigences non-fonctionnelles
- Build statique sans backend runtime pour la home, avec bundle JS isolé pour `/lab/`.
- Responsive mobile/desktop.
- Accessibilité de base (focus visible, contrastes, structure sémantique).
- Performance cible Lighthouse mobile >= 90 et SEO = 100.

## Matrice d’arbitrage DA vs conversion

| Conflit | Priorité | Règle |
| --- | --- | --- |
| Effet visuel vs lisibilité CTA | Conversion | Conserver style global, simplifier zone CTA |
| Motion forte vs confort utilisateur | Accessibilité | Maintenir narration avec fallback reduced-motion |
| Densité graphique vs compréhension | Compréhension | Éclaircir le bloc contenu, garder texture en périphérie |
| Label créatif vs navigation | Navigation | Garder labels libres, conserver ancres core |
| Accent couleur vs contraste texte | Lisibilité | Ajuster contraste avant validation |

## Critères d'acceptation (AC)
- AC1: Le site affiche une identité studio différenciante (pas un placeholder technique).
- AC2: Les ancres core fonctionnent (`#a-propos`, `#projets`, `#contact`).
- AC3: Le rendu mobile ne casse pas la grille et n’a pas d’overflow horizontal.
- AC4: Contrat GTM/GA4 inchangé et vérifiable.
- AC5: Storybook build passe avec sections clés couvertes.
- AC6: Déploiement GitHub Pages documenté et reproductible.

## Non-objectifs
- Pas de blog dynamique.
- Pas d'injection CMS/API dans ce cycle.
- Pas de formulaire backend.
- Pas de migration complète de tout le site vers la stack secondaire (seul `/lab/` est concerné).

## Risques
- Branding incomplet si logos/médias finaux non validés.
- Régression conversion si style trop dominant localement.

## Livrables DA-00
1. Brief DA v1.3.0 verrouillé.
2. Guidelines DA avec zoning + matrice arbitrage.
3. Wireflow conversion desktop/mobile + user flow CTA.
4. Backlog DA-01 décision-complet (mapping section/token/interaction).

## TODO / Informations manquantes
- Source de vérité TODO: `docs/project-master-todos.md`
- TODO externe: valider GA4 Realtime/DebugView + conversions LinkedIn/Malt.
- TODO externe: Search Console + sitemap indexation.
- TODO externe: previews sociaux LinkedIn/Facebook.
