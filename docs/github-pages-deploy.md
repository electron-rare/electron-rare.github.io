# Deploiement GitHub Pages (site statique + module Lab interactif)

## Prerequis
- Depot Git connecte a GitHub (`git remote -v` non vide).
- Dependances installees:
  - `npm install`
  - `npm --prefix apps/lab-interactif install`
- Build module lab OK (`npm run lab:build`).
- Workflow present: `.github/workflows/deploy-pages.yml`.
- Fichiers de publication racine presents:
  - `index.html`, `styles.css`, `script.js`
  - `assets/` (dont `assets/og-cover.jpg` + `assets/brand/*`)
  - `robots.txt`, `sitemap.xml`
  - favicons (`favicon*`, `apple-touch-icon.png`)

## Configuration GitHub Pages
1. GitHub > depot > **Settings** > **Pages**.
2. Dans **Build and deployment**:
   - **Source**: `GitHub Actions`
3. Enregistrer.

## Pipeline deploiement
Workflow: **Deploy Static Site + Lab to GitHub Pages**

Le job build:
1. installe les deps racine
2. installe les deps du module `apps/lab-interactif`
3. build le module interactif dans `lab/`
4. prepare un artifact `.pages-dist/` (site + assets + lab)
5. deploye via `actions/deploy-pages`

## Commandes locales utiles
- Home statique: `python3 -m http.server 4173`
- Lab dev: `npm run lab:dev`
- Lab build: `npm run lab:build`
- Tracking contract: `npm run tracking:check`
- Storybook build: `npm run storybook:build`
- Preflight complet pages: `npm run preflight:pages`
- Build externe Astro (avec `/lab` inclus): `npm run build:external`

## Déploiement externe Astro (Vercel/Netlify)

Objectif: publier `dist/` généré par Astro pour une version hors GitHub Pages.

- Préparer les variables d’environnement:
  - `PUBLIC_SITE_URL=https://<votre-domaine-vercel-ou-netlify>/` (canonical + OG)
  - éventuellement `EXTERNAL_SITE_URL` comme alias pratique
- Exécuter: `npm run build:external`
- GitLab/Netlify et Vercel détectent automatiquement `vercel.json` / `netlify.toml` :
  - `vercel`: `npm run build:external`
  - `netlify`: `npm run build:external`
- Le build externe inclut:
  - page Astro Home: `dist/index.html`
  - page `dist/robots.txt` et `dist/sitemap.xml`
  - bundle Astro `_astro/`
  - `dist/lab/` (copié après `lab:build`) si `lab/` existe

## Notes de contrôle pour version externe
- Vérifier `https://<domaine-externe>/` après déploiement.
- Vérifier les ancres `/` : `#a-propos`, `#projets`, `#contact`.
- Vérifier que `canonical` correspond bien à `PUBLIC_SITE_URL`.
- Vérifier OG/Twitter preview via cache buster si nécessaire.
- Vérifier la présence de `/lab/` selon la stratégie produit.

## Stratégie de déploiement duale (si besoin business)
- Production: GitHub Pages reste la version publiée courante (`index.html`, `styles.css`, `script.js`, `/lab/`).
- Complément: version web hors GitHub possible via build Astro dédié (`npm run build:external`), puis publication sur hôte dédié (Netlify/Vercel/custom).
- Contrat immuable: ancres `#a-propos`, `#projets`, `#contact`, labels CTA, et paramètres GA4 conservés entre versions.

## Contrat tracking GTM + GA4

### Container
- GTM: `GTM-5SLM67QF`

### Evenements principaux
- `cta_hero_projets`
- `cta_hero_contact`
- `cta_hero_profile`
- `outbound_linkedin_contact`
- `outbound_malt_contact`
- `outbound_bandcamp_contact`
- `outbound_github_contact`

### Evenements GitHub dedies
- `outbound_github_project_rtc_bl_phone`
- `outbound_github_project_zacus`
- `outbound_github_project_site`
- `outbound_github_lab_more`
- `cta_lab_interactif_open`

### Compat historique
- Les liens GitHub critiques conservent `data-track-legacy` pour pousser aussi les evenements legacy.

### Parametres obligatoires
- `event_category=engagement`
- `event_label=<nom_evenement>`
- `destination=<domaine|ancre|path>`

## Verification post-deploiement
- [ ] `https://electron-rare.github.io/` charge correctement
- [ ] `https://electron-rare.github.io/lab/` charge correctement
- [ ] Ancres core home (`#a-propos`, `#projets`, `#contact`) OK
- [ ] `robots.txt` accessible
- [ ] `sitemap.xml` accessible (inclut `/` + `/lab/`)
- [ ] OG/Twitter preview OK
- [ ] GA4 Realtime voit les events clics
- [ ] GA4 DebugView confirme `event_label` + `destination`
- [ ] Search Console: sitemap soumis + indexation `/` et `/lab/`

## Notes de routage module C
- Le module lab utilise `HashRouter` pour compatibilite hebergement statique (GitHub Pages).
- Routes attendues:
  - `/lab/` (overview)
  - `/lab/#/signals`
  - `/lab/#/prototypes`
