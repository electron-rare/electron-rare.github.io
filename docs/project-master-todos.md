# Master TODO - Electron Rare OVH/Astro

Updated: 2026-03-14
Source of truth: this file for execution priorities, plus the current code in `src/`

## Scope actif
- Site Astro publie sur OVH via GitHub Actions FTP.
- Preview publique sous `/preview/`, production a la racine.
- Pages actives: `/`, `/formation/`, `/mentions-legales/`, `/lab/`, `robots.txt`, `sitemap.xml`.
- Direction artistique active: `white-contrast`, claire par defaut, sans bouton de bascule public.
- Surface a maintenir: Hero, Approche, Cas concrets, photo strip, video strip, Missions, FAQ, Contact, footer.

## Verites de reference
- Structure de page: `src/pages/index.astro`
- Sections actives: `src/components/sections/Hero.tsx`, `About.tsx`, `CaseStudies.tsx`, `GraphicSprints.tsx`, `Faq.astro`, `Contact.astro`
- Theme/layout: `src/layouts/BaseLayout.astro`, `src/styles/global.css`, `src/styles/home-workbench.css`
- Canonical/base/deploiement: `src/lib/site.ts`, `scripts/build-astro-external.mjs`, `docs/ovh-ftp-preview-solution-2026-03-14.md`
- Tracking actif: `src/lib/tracking.ts` + emitters inline dans `src/layouts/BaseLayout.astro`

## Etat courant
- [x] Homepage OVH re-synchronisee dans le repo Astro.
- [x] Ancienne variante `studio/figma` sortie du runtime actif.
- [x] Bouton contraste retire du markup.
- [x] Theme blanc contraste force par defaut dans le layout source.
- [x] Reliquats CSS `.site-contrast-toggle` supprimes du source actif.
- [x] Build preview local `PUBLIC_SITE_URL=/preview/` repasse propre.
- [x] Validation tracking recalee sur le contrat Astro actif.
- [x] Workflow OVH enrichi avec verification HTTP publique post-deploiement.
- [ ] White-contrast pass verifiee visuellement sur preview.
- [ ] White-contrast pass verifiee visuellement sur production.

## P0 - Bloc de sortie immediate
- [x] Builder le preview avec le theme blanc contraste (`PUBLIC_SITE_URL=https://www.lelectronrare.fr/preview/ npm run build:external`).
- [ ] Verifier le rendu de la home: nav, hero, approche, cas clients, missions, FAQ, footer.
- [ ] Verifier les surfaces medias: hero photo, photo strip, video strip.
- [ ] Verifier la section contact en version claire: tabs, textarea, formulaire, focus clavier, messages d'etat.
- [ ] Verifier `/formation/` et `/mentions-legales/` avec le meme theme clair.
- [ ] Deployer le preview OVH et valider `https://www.lelectronrare.fr/preview/`.

## P1 - Validation live
- [ ] Si preview valide, deployer la production a la racine.
- [ ] Verifier en live les routes `/`, `/formation/`, `/mentions-legales/`, `/lab/`, `/robots.txt`, `/sitemap.xml`.
- [ ] Verifier l'absence de retour vers l'ancienne homepage ou d'elements sombres residuels.
- [ ] Verifier les ancres actives: `#a-propos`, `#cas-clients`, `#graphic-sprints-title`, `#faq`, `#contact`.

## P2 - Tracking / SEO
- [ ] Valider GA4 Realtime et DebugView pour les events actuels:
  - `cta_hero_contact`
  - `outbound_linkedin_contact`
  - `outbound_email_contact`
  - `outbound_github_contact`
  - `cta_lab_interactif_open`
- [ ] Verifier les events auto:
  - `experiment_variant_exposed`
  - `engagement_scroll_depth`
  - `engagement_section_view`
  - `cwv_metric`
- [ ] Re-verifier canonical, OG, Twitter, robots, sitemap et `theme-color`.
- [ ] Soumettre ou recontroler Search Console sur la base de la prod actuelle OVH.

## P3 - Nettoyage et consolidation
- [x] Supprimer les blocs CSS morts `.site-contrast-toggle` encore presents dans `src/styles/global.css`.
- [ ] Nettoyer les docs qui parlent encore de GitHub Pages static root, `#projets`, Malt, ou du toggle contraste.
- [ ] Mesurer LCP et budget media de la variante blanche en conditions reelles.
- [ ] Archiver les plans anterieurs devenus purement historiques.

## Regles de pilotage
- Preview d'abord, production ensuite.
- Toute doc active doit parler du site Astro/OVH actuel, pas d'une ancienne homepage statique.
- Les ancres de reference sont celles du code actuel, pas `#projets`.
- Le theme de reference est clair/white-contrast par defaut.
