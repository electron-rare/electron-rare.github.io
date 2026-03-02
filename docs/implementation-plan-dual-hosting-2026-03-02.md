# Plan d'implémentation — Double hébergement (GitHub Pages + Web externe)

Date: 2026-03-02
Statut: En cours
Pilote: Codex

## 1) Audit rapide du repo

### Etat actuel confirmé
- Pipeline GitHub Pages présent: `.github/workflows/deploy-pages.yml`
- Build externe Astro présent: `npm run build:external` -> `dist/`
- Config Vercel présente: `vercel.json`
- Config Netlify présente: `netlify.toml`
- Scripts déploiement serveur mutualisé présents: `scripts/deploy-ovh-ftp.sh`, `scripts/deploy-ovh-sftp.sh`
- Contrat tracking présent et automatisé: `npm run tracking:check`

### Vérification technique locale (2026-03-02)
- `npm run tracking:check` : OK
- `npm run build:external` : OK
- `dist/lab/` est bien inclus après build externe

## 2) Décision d'architecture (recommandée)

### Cible A — GitHub Pages (production stable)
- Garder la version racine statique actuelle (`index.html`, `styles.css`, `script.js`, `assets/`, `lab/`).
- Continuer le déploiement via workflow Pages existant.

### Cible B — Web externe (production parallèle)
- Publier la version Astro `dist/` issue de `npm run build:external`.
- Priorité recommandée: Vercel (intégration Astro directe).
- Fallback 1: Netlify (build command + publish directory déjà prêts).
- Fallback 2: Cloudflare Pages (si besoin edge/CDN/Workers unifiés).

## 3) Plan agents + TODOs

## Agent 1 — Stabilisation GitHub Pages
- [ ] Vérifier dans GitHub Settings > Pages que la source est `GitHub Actions`.
- [ ] Lancer le workflow actuel sur `main` (push ou `workflow_dispatch`).
- [ ] Contrôler en public:
  - [ ] `https://electron-rare.github.io/`
  - [ ] `https://electron-rare.github.io/lab/`
  - [ ] ancres `#a-propos`, `#projets`, `#contact`
- [ ] Si domaine custom: configurer le domaine dans les settings Pages (pas uniquement via fichier `CNAME`).

## Agent 2 — External Web (Vercel prioritaire)
- [ ] Créer/importer le projet sur Vercel depuis ce repo.
- [ ] Conserver `buildCommand: npm run build:external` et `outputDirectory: dist` (déjà dans `vercel.json`).
- [ ] Définir `PUBLIC_SITE_URL=https://<domaine-externe>/` dans l'environnement de build.
- [ ] Déployer et valider:
  - [ ] `/`
  - [ ] `/#a-propos`, `/#projets`, `/#contact`
  - [ ] `/lab/`

## Agent 3 — Fallback external (Netlify ou Cloudflare)
- [ ] Netlify (fallback): importer repo, confirmer `command` et `publish` depuis `netlify.toml`.
- [ ] Cloudflare Pages (fallback): configurer Build command `npm run build:external` et Build output directory `dist`.
- [ ] Harmoniser la variable `PUBLIC_SITE_URL` sur l'hôte retenu.

## Agent 4 — Qualité, SEO, tracking, non-régression
- [ ] Exécuter avant release:
  - [ ] `npm run tracking:check`
  - [ ] `npm run preflight:pages`
- [ ] Contrôles SEO sur les 2 cibles:
  - [ ] `robots.txt`
  - [ ] `sitemap.xml`
  - [ ] canonical cohérent avec le domaine
- [ ] Contrôles analytics:
  - [ ] GA4 Realtime
  - [ ] GA4 DebugView (`event_category`, `event_label`, `destination`)
- [ ] Contrôles visuels 390/768/1024/1440 avec captures archivées dans `artifacts/`.

## 4) Risques et garde-fous
- Le repo local est actuellement en état très modifié (worktree non propre): ne pas mélanger ce plan avec des modifications UI non stabilisées.
- Garder un seul domaine principal déclaré comme canonique par cible.
- Ne pas dériver le contrat tracking entre Pages et version externe.

## 5) Critères de fin
- [ ] GitHub Pages stable validé en public.
- [ ] Une cible externe validée en public (Vercel recommandé).
- [ ] Contrat tracking validé sur les deux cibles.
- [ ] Checklist SEO validée sur les deux cibles.

## 6) Références web (implémentation)
- GitHub Docs — Publishing source (branch ou custom Actions):
  - https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- GitHub Docs — Custom domain + DNS + sécurité:
  - https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- Astro Docs — Déploiement GitHub Pages:
  - https://docs.astro.build/en/guides/deploy/github/
- Astro Docs — Déploiement Vercel:
  - https://docs.astro.build/en/guides/deploy/vercel/
- Astro Docs — Déploiement générique (build/publish dist):
  - https://docs.astro.build/en/guides/deploy/
- Netlify Docs — Build command / publish directory:
  - https://docs.netlify.com/configure-builds/get-started/
- Cloudflare Pages Docs — Build command / output directory:
  - https://developers.cloudflare.com/pages/configuration/build-configuration/
