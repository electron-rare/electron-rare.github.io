# Design Memory - White Contrast Baseline

Date: 2026-03-14
Status: active

## Decision
La version publique de L'Electron Rare repart sur une base claire, contraste blanc, par defaut.

## Pourquoi
- la homepage OVH synchronisee est la bonne base produit
- l'ancienne DA sombre et experimentale brouillait la lisibilite
- le site doit inspirer precision, methode et confiance avant de projeter un univers
- l'accessibilite et la lecture rapide gagnent avec des surfaces claires et des accents plus disciplinés

## Regles visuelles
- fonds: blanc, ivoire, creme tres legere
- texte principal: noir chaud / brun tres fonce
- accent froid: teal technique
- accent chaud: cuivre / brun signal
- panneaux: clairs, nets, ombres courtes
- pas de halo neon comme logique dominante
- pas de glitch ou scanline comme effet de signature principal

## Ce qui reste autorise
- texture subtile de trame ou de grille
- references bench / signal / PCB en couche legere
- typography mono sur certains labels et statuts
- accents rust/teal sur CTA, badges, progression et reperes

## Ce qui est interdit
- retour a la home `studio/figma`
- bouton contraste sans vraie fonctionnalite produit
- docs qui parlent encore de GitHub Pages statique comme prod active
- anchors/documentation legacy de type `#projets`

## Implementation
- runtime: `data-theme="high-contrast"` dans `src/layouts/BaseLayout.astro`
- meta navigateur claire: `themeColor` blanc dans `src/lib/site.ts`
- socle visuel: `src/styles/global.css`
- overrides DA v12: `src/styles/home-workbench.css`

## QA minimum
- nav
- hero
- about
- case studies
- media strips
- mission cards
- FAQ
- contact
- footer
- formation
- mentions legales
