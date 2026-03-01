# Déploiement GitHub Pages (Astro studio stack)

## Prérequis
- Dépendances installées (`npm install`).
- Build local OK (`npm run build`).
- Workflow présent: `.github/workflows/deploy-pages.yml`.
- Fichiers publics en place:
  - `public/robots.txt`
  - `public/sitemap.xml`
  - `public/assets/og-cover.jpg`
- GTM configuré via variable `PUBLIC_GTM_CONTAINER_ID` (par défaut actuel: `GTM-5SLM67QF`).

## Configuration GitHub Pages
1. GitHub > dépôt > **Settings** > **Pages**.
2. Dans **Build and deployment**:
   - **Source**: `GitHub Actions`
3. Enregistrer.

## Déploiement
1. Push sur `main` (ou lancer `workflow_dispatch`).
2. Vérifier le workflow **Deploy Astro to GitHub Pages**.
3. Attendre l'URL de déploiement dans le job `deploy`.

## Commandes locales
- Dev: `npm run dev`
- Typecheck: `npm run typecheck`
- Build prod: `npm run build`
- Storybook: `npm run storybook`
- Storybook build: `npm run storybook:build`

## Instrumentation GTM + GA4
1. Créer/associer un conteneur GTM et propriété GA4.
2. Vérifier `PUBLIC_GTM_CONTAINER_ID` utilisé au build/deploy.
3. Publier le conteneur GTM.
4. Vérifier GA4 Realtime et DebugView.

### Contrat d'événements (`dataLayer`)
- `cta_hero_projets`
- `cta_hero_contact`
- `cta_hero_profile`
- `outbound_linkedin_project`
- `outbound_linkedin_contact`
- `outbound_malt_contact`
- `outbound_bandcamp_project`
- `outbound_bandcamp_contact`

Paramètres:
- `event_category=engagement`
- `event_label=<nom_evenement>`
- `destination=<domaine|ancre>`

Conversions recommandées:
- Primaire: `outbound_linkedin_contact`
- Secondaire: `outbound_malt_contact`

## Vérification post-déploiement
- URL publique chargée sans erreur.
- Sections et ancres (`#a-propos`, `#projets`, `#contact`) OK.
- `https://electron-rare.github.io/robots.txt` accessible.
- `https://electron-rare.github.io/sitemap.xml` accessible.
- OG/Twitter image OK (`/assets/og-cover.jpg`).
- GA4 Realtime + DebugView remontent les events et paramètres.
- Aperçu social validé (LinkedIn Post Inspector / Facebook Debugger).

## Traçabilité
- Mettre à jour `evidence/manifest.json`.
- Ajouter artefacts dans `artifacts/*/<date>/` à chaque itération.
