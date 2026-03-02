# Backlog DA-01 — Decision Complet

Date: 2026-03-02
Source: Sprint DA-00 (brief + wireflow conversion)

## Objectif
Implémenter la refonte complète selon le wireflow validé, sans modifier les contrats publics (anchors core, tracking, SEO).

## Etat d'avancement DA (2026-03-02)
- [x] Mapping section/composants finalisé en phase de refonte.
- [x] DA-00 intégré: structure Header/Hero/Systems/Production/Conversion/Footer et zones mobiles définies.
- [x] Contrat tokens/typographie/couleurs maintenu dans `src/styles/global.css`.
- [x] Validation finale pré-production en cours (preflight + checks build locaux + captures Figma consolidées).
- [ ] Plan de version web hors GitHub réservé (build Astro externe) en attente de besoin produit.
- [ ] Revue de dérive visuelle et conversion à refaire sur chaque release majeure.

## 1) Mapping section -> composants

1. `Header_ControlRoom`
- Cible: `src/pages/index.astro` + `src/layouts/BaseLayout.astro`
- Eléments:
  - nav niveau 1 (labels libres)
  - bus posture (niveau 2)
  - status + contrast toggle

2. `Hero_Impact`
- Cible: `src/components/sections/Hero.tsx`
- Eléments:
  - hook visuel
  - manifeste 3 lignes
  - CTA dual rail

3. `Identity_Proof`
- Cible: `src/components/sections/IdentityLab.tsx` + `TrustStrip.tsx`
- Eléments:
  - identité studio
  - preuves rapides

4. `Systems_Block`
- Cible: `FlowDiagram.tsx` + `SystemPipeline.tsx` + `About.tsx`
- Eléments:
  - explication process
  - architecture systeme

5. `Production_Block`
- Cible: `Projects.tsx` + `ProjectsTimeline.tsx` + `LabNotes.tsx`
- Eléments:
  - portfolio systemique
  - chronologie
  - protocole Intent->Result

6. `Conversion_Block`
- Cible: `TrustStrip.tsx` + `Contact.tsx`
- Eléments:
  - reassurance
  - contact 2 voies (LinkedIn/Malt)

7. `Footer_Knowledge`
- Cible: `src/pages/index.astro` + `src/styles/global.css`
- Eléments:
  - liens process/stack/contact

## 2) Mapping token -> CSS var

Fichier cible: `src/styles/global.css`

### Palette
- `--bg`, `--bg-elevated`, `--surface`, `--surface-soft`, `--surface-alt`
- `--trace-cyan`, `--trace-magenta`, `--trace-green`, `--trace-amber`
- `--electric`, `--accent`, `--signal`
- `--line`, `--line-soft`, `--line-edge`, `--line-rail`

### Typographie
- display serif editorial
- body sans
- micro labels mono

### Layout
- `site-shell` largeur max desktop
- grilles desktop/mobile (1440/390)
- rules sections `structure-grid` / `structure-cell`

## 3) Mapping interaction -> motion rule

### Navigation
- progress line header
- etat actif sur section visible
- micro-jitter actif uniquement sur lien actif

### Sections
- reveal par bloc (opacity + translateY)
- cadence differenciee par bloc (Hero > Systems > Conversion)

### CTA
- etat hover/focus/active explicite
- primaire > secondaire visuellement

### Accessibilite motion
- `prefers-reduced-motion`: desactiver animations non essentielles

## 4) Interfaces internes a standardiser

### CTA contract
Type logique:
- `label: string`
- `href: string`
- `event: TrackEventName`
- `destination: string`
- `external?: boolean`

Usage:
- Hero, About, Projects, Contact, Trust utilisent le meme contrat.

### Proof card contract
Type logique:
- `label: string`
- `value: string`
- `priority?: "high" | "medium"`

### Timeline/LabNotes contract
Type logique:
- `date/year`
- `title`
- `category`
- `summary`
- `href/event/destination` optionnels

## 5) Gates de validation DA-01

### Gate Build
- `npm run typecheck`
- `npm run build`
- `npm run preflight:pages`
- `npm run tracking:check`

### Gate UX
- ancres `#a-propos`, `#projets`, `#contact` fonctionnelles
- CTA primary/secondary lisibles
- mobile 390 sans overflow
- validation 390/768/1024/1440 conservée dans evidence

### Gate Tracking
- events declenches sans duplication
- params `event_category/event_label/destination` conformes

### Gate Accessibilite
- focus visible
- ordre tab coherent
- reduced-motion OK

### Gate SEO
- robots/sitemap accessibles
- canonical + OG/Twitter presents

## 6) Ordre d’implementation recommande

### P0
1. Recomposer la structure de `src/pages/index.astro`
2. Harmoniser tokens/layout de `src/styles/global.css`
3. Verifier ancres core + tracking

### P1
1. Harmoniser les sections (Hero, Systems, Production, Conversion)
2. Finaliser footer knowledge/protocoles
3. QA responsive + accessibilite

### P2
1. Storybook coverage structure + sections
2. Optimisation bundle/motion

## 7) Risques et parades

1. Risque: surcharge visuelle
- Parade: matrice arbitrage DA vs conversion appliquee

2. Risque: regression tracking
- Parade: tests manuels click-by-click + check dataLayer

3. Risque: degrade mobile
- Parade: validation systematique 390/768/1024/1440

## 8) Version duale (prod immédiate + web hors GitHub)
- Production immédiate: GitHub Pages conserve la version `index.html/styles.css/script.js` pour stabilité.
- Version web hors GitHub: build Astro `dist/` prévu comme variante de long terme (non déployé pour le moment).
- Règle: aucun changement d'UI ne doit diverger sans mise à jour explicite des 2 cahiers de preuve (scope statique + scope web externe).

## 9) Definition of done DA-01
1. Structure cible implementee en code.
2. DA conforme au brief v2.0.0.
3. Contrats publics preserves.
4. Tests passes et evidence mise a jour.
