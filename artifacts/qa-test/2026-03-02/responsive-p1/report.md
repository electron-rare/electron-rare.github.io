# P1 QA Report - Responsive + Storybook + Prod Checklist

- Date: 2026-03-02
- Scope: Home statique (`/`) + module interactif (`/lab/`)
- Environment: local server `http://127.0.0.1:4173`

## 1) Passe visuelle responsive (390/768/1024/1440)

### Captures generees
- Home: `home-*.png`
- Home ancre projets: `home-projets-*.png`
- Home ancre contact: `home-contact-*.png`
- Lab overview: `lab-*.png`
- Lab signals (hash route): `lab-signals-*.png` via `/lab/#/signals`
- Lab prototypes (hash route): `lab-prototypes-*.png` via `/lab/#/prototypes`

Dossier: `artifacts/qa-test/2026-03-02/responsive-p1/`

### Controle overflow (proxy technique via largeur image)
- Regle: largeur image capturee == largeur viewport attendue
- Resultat: `24/24 PASS`
- Preuve: `image-dimensions.csv`

### Resultat visuel
- 390: navigation et CTA lisibles, cartes projets en colonne, section contact accessible.
- 768: grille home stable, hierarchy typographique correcte, lab lisible.
- 1024: grille projets en 3 cartes stable, pas de debordement.
- 1440: layout home + lab coherent, densite visuelle conforme DA v2.

### Observation
- Les sections avec `data-reveal` ne deviennent visibles qu'au scroll (normal), d'ou besoin de captures ancrees (`#projets`, `#contact`) pour la verification complete.
- Routing statique module C corrige: passage de `BrowserRouter` a `HashRouter` pour eviter les 404 directs en hebergement GitHub Pages.

## 2) Storybook coverage P2

Commande executee:
```bash
npm run storybook:build
```

Resultat:
- Status: PASS
- Output: `storybook-static/`
- Warnings non bloquants:
  - directives `"use client"` ignorees dans `framer-motion` lors du bundling
  - chunk size warning > 500kB (storybook docs bundle)

## 3) Checklist prod GA4 / Search Console

### GA4/GTM (verifiable localement)
- [x] Container GTM present (`GTM-5SLM67QF`) dans `index.html`
- [x] Push `dataLayer` actif
- [x] Events hero existants conserves:
  - `cta_hero_projets`, `cta_hero_contact`, `cta_hero_profile`
- [x] Events GitHub dedies actifs:
  - `outbound_github_project_rtc_bl_phone`
  - `outbound_github_project_zacus`
  - `outbound_github_project_site`
  - `outbound_github_lab_more`
  - `cta_lab_interactif_open`
- [x] Legacy fallback conserve via `data-track-legacy` pour compatibilite historique

### Search Console / SEO (verifiable localement)
- [x] `robots.txt` a la racine
- [x] `sitemap.xml` a la racine
- [x] Sitemap maj au 2026-03-02 avec:
  - `/`
  - `/lab/`
- [x] Canonical + OG + Twitter tags presents dans `index.html`

### A faire en prod (manuel)
- [ ] GA4 DebugView: verifier reception de tous les events dedies GitHub
- [ ] GA4 Realtime: verifier session + events sur domaine public
- [ ] Search Console: soumettre `https://electron-rare.github.io/sitemap.xml`
- [ ] Search Console: verifier indexation de `/` et `/lab/`
- [ ] Validation preview sociale LinkedIn/Facebook

## Verdict P1
- Responsive QA: PASS
- Storybook coverage build: PASS
- Prod checklist locale: PASS
- Actions manuelles restantes: GA4 DebugView + Search Console en environnement public

## 4) Preflight et pipeline pages

Commande executee:
```bash
npm run preflight:pages
```

Resultat:
- Status: PASS
- Etapes validees:
  - `lab:build`
  - `tracking:check`
  - `storybook:build`
- Warnings non bloquants identiques sur Storybook/framer-motion.

Mise a jour CI:
- Workflow `.github/workflows/deploy-pages.yml` migre vers publication statique + module `/lab/` via artifact `.pages-dist`.
