# EXECUTION IMMEDIATE - White Contrast Rollout

Updated: 2026-03-14
Severite: critique pour coherence visuelle et lisibilite

## 3 actions prioritaires

### 1. Basculer tout le site sur une DA blanche par defaut
Probleme:
- la home synchronisee OVH est la bonne base, mais une partie du CSS reste encore oriente sombre
- le runtime pointait encore vers `data-theme="default"`

Action:
- passer le layout sur un theme clair par defaut
- reposer les surfaces principales sur blanc/ivoire
- reprendre les accents en teal/rust
- traiter explicitement les ilots a risque:
  - hero photo
  - photo strip
  - video strip
  - `contact-minitel`
  - FAQ focus

Fichiers cle:
- `src/layouts/BaseLayout.astro`
- `src/lib/site.ts`
- `src/styles/global.css`
- `src/styles/home-workbench.css`

### 2. Rebuilder et verifier le preview OVH
Action:
- builder la variante preview avec le bon `PUBLIC_SITE_URL`
- verifier que tous les liens et assets sortent en `/preview/`
- publier sur OVH seulement apres build propre

Commande de base:
```bash
cd /home/zacus/electron-rare-preview-ovh
PUBLIC_SITE_URL=https://www.lelectronrare.fr/preview/ npm run build:external
```

### 3. Revalider la production actuelle apres preview
Action:
- tester les pages et ancres reelles du site
- verifier la suppression du contraste sombre sur les surfaces critiques
- confirmer tracking et meta minimums

Routes a verifier:
- `/`
- `/formation/`
- `/mentions-legales/`
- `/lab/`
- `/robots.txt`
- `/sitemap.xml`

## Cible de sortie
- theme blanc contraste par defaut
- contact lisible et clavier-friendly
- preview valide avant push prod
- docs alignees sur Astro + OVH + GitHub Actions FTP

## Regles
- ne plus documenter `index.html`, `script.js`, ou GitHub Pages root files comme source de prod
- ne plus parler de `#projets`, Malt, ou du bouton contraste
- ne plus relancer l'ancienne DA `studio/figma`
