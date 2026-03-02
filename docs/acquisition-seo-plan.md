# Plan d'avancement Acquisition/SEO (7 jours + 30 jours)

Date de mise à jour: 2026-03-02
Perimetre: site statique GitHub Pages (`index.html`, `styles.css`, `script.js`) + module interactif `/lab/` (Vite + React Router hash)
Référence priorités globale: `docs/project-master-todos.md`

## Objectif
Transformer le site en base d'acquisition mesurable, sans backend, avec une home legere et un module interactif isole.

## Avancement immédiat (P0/P1)

### P0 (immédiat)
- [x] URL canonique fixée (`https://electron-rare.github.io/`)
- [x] `robots.txt` à la racine
- [x] `sitemap.xml` à la racine
- [x] `sitemap.xml` inclut `/` + `/lab/`
- [x] Contrat d'événements tracking implémenté (`data-track` + `dataLayer` enrichi)
- [x] Remplacer `GTM-REPLACE_ME` par l'ID GTM réel (`GTM-5SLM67QF`)
- [ ] Valider événements en GA4 Realtime

### P1 (cette semaine)
- [x] `og:image` + `twitter:image` ajoutés
- [x] Asset social `assets/og-cover.jpg` créé (1200x630)
- [x] Copy contact orientée booking/collaboration + éléments de confiance
- [x] Ajustement responsive <=390px
- [x] Passe responsive complete 390/768/1024/1440 (home + lab)
- [x] Exécuter audit Lighthouse mobile/desktop et archiver résultats
- [x] Storybook build coverage P2 execute
- [ ] Vérifier aperçus sociaux en production (LinkedIn/Facebook debugger)

### P2 (mois)
- [ ] Expériences CTA (texte/ordre LinkedIn/Malt)
- [ ] Revue snippets SEO par itération
- [ ] Dashboard acquisition hebdo (GA4)

## Plan 7 jours (exécution)

### Jour 1 — Baseline
- Faire un snapshot Lighthouse mobile/desktop.
- Documenter baseline (SEO, accessibilité, perf, conversion).

### Jour 2 — SEO technique
- Vérifier indexabilité (`robots`, `sitemap`, canonical, OG/Twitter).
- Contrôler cohérence des URLs (absolues pour SEO social).

### Jour 3 — Instrumentation GA4/GTM
- Brancher GTM réel.
- Publier conteneur.
- Vérifier événements critiques.

### Jour 4 — Conversion UX
- Ajuster wording CTA si besoin.
- Vérifier priorité LinkedIn (primaire) / Malt (secondaire).

### Jour 5 — Performance/A11y
- Corriger points Lighthouse restants.
- Vérifier navigation clavier et focus visibles.

### Jour 6 — QA déploiement
- Vérifier production live.
- Contrôler métriques Realtime GA4.

### Jour 7 — Stabilisation
- Corriger résiduels P1.
- Mettre à jour evidence + artifacts.

## Roadmap 30 jours

### Semaine 2
- Renforcer contenu SEO par section.
- Ajouter pages projets supplémentaires (si besoin).

### Semaine 3
- Tests A/B CTA (copy + ordre des liens contact).
- Analyse CTR par emplacement.

### Semaine 4
- Consolidation dashboard GA4.
- Revue Search Console et plan éditorial suivant.

## Contrat tracking (source de vérité)

Événements:
- `cta_hero_projets`
- `cta_hero_contact`
- `cta_hero_profile`
- `outbound_linkedin_contact`
- `outbound_malt_contact`
- `outbound_bandcamp_contact`
- `outbound_github_contact`
- `outbound_github_project_rtc_bl_phone`
- `outbound_github_project_zacus`
- `outbound_github_project_site`
- `outbound_github_lab_more`
- `cta_lab_interactif_open`

Compat legacy:
- `outbound_github_project`
- `outbound_github_contact`

Paramètres:
- `event_category=engagement`
- `event_label=<event_name>`
- `destination=<domain|anchor>`
