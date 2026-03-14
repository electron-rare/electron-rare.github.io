# EXECUTION IMMEDIATE - White Contrast + Mobile Header

Updated: 2026-03-14
Severite: critique pour coherence visuelle et lisibilite

## 3 actions prioritaires

### 1. Finaliser la top bar mobile compacte
Probleme:
- la top bar historique etait trop haute sur mobile
- elle reprenait une logique desktop qui wrap, au lieu d'une navigation mobile compacte

Action:
- un header partage pour home, formation et mentions
- un acces direct `Contact` visible hors menu
- un menu repliable pour le reste de la navigation
- fermeture automatique apres clic, `Escape`, ou retour desktop

Fichiers cle:
- `src/components/SiteHeader.astro`
- `src/layouts/BaseLayout.astro`
- `src/styles/global.css`
- `src/pages/index.astro`
- `src/pages/formation.astro`
- `src/pages/mentions-legales.astro`

### 2. Verifier visuellement le preview OVH
Action:
- controler la top bar sur mobile reel
- verifier qu'elle reste compacte fermee
- verifier que le menu est lisible et stable ouvert

Etat:
- preview top bar publie et valide publiquement via GitHub Actions `23095540371`

### 3. Verifier la production reellement servie
Action:
- confirmer dans un navigateur humain que `www` sert bien la nouvelle home et le nouveau header
- verifier localement avec le meme `User-Agent` que le workflow quand on utilise `curl`
- finaliser la validation UX mobile humaine

Etat:
- production top bar republiee via GitHub Actions `23096174775`
- verification publique du workflow: OK
- verification locale `curl` OK avec `-A 'electron-rare-gh-verify/1.0'`

Routes a verifier:
- `/`
- `/formation/`
- `/mentions-legales/`
- `/lab/`
- `/robots.txt`
- `/sitemap.xml`

## Cible de sortie
- theme blanc contraste par defaut
- top bar mobile compacte et state-of-art
- contact lisible et clavier-friendly
- preview valide avant push prod
- docs alignees sur Astro + OVH + GitHub Actions FTP

## Regles
- ne plus documenter `index.html`, `script.js`, ou GitHub Pages root files comme source de prod
- ne plus parler de `#projets`, Malt, ou du bouton contraste
- ne plus relancer l'ancienne DA `studio/figma`
