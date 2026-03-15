# Design Memory - White Contrast Baseline

Date: 2026-03-14
Status: active

## Decision
La version publique de L'Electron Rare repart sur une base claire, contraste blanc, par defaut.
Le positionnement public de reference devient : systemes electroniques specifiques, avec focales visibles sur electronique, automatisme, energie, stockage et optimisation.

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

## Hero actif
- eyebrow: `Electronique · automatisme · energie · optimisation`
- titre: `Systemes electroniques specifiques, du besoin au livrable fiable`
- sous-ligne: `electronique · automatisme · energie`
- fond image: oscilloscope en plan rapproche, lecture waveform / interface de mesure
- cadrage: image utile a droite, pas atelier large illisible
- surcouches: gradients clairs et accents teal/rust tres legers
- interdit:
  - texture carnet legacy sur le panneau hero blanc
  - photo d'atelier trop large ou trop generique
  - overlays qui salissent la lecture du titre ou du CTA

## Regles header 2026
- desktop: navigation inline, stable, sans bruit inutile
- mobile: header compact, une seule ligne utile a l'ouverture de page
- mobile: kicker masque, marque raccourcie visuellement, pas de wrap multi-lignes par defaut
- mobile: un acces direct `Contact` reste visible hors menu
- mobile: le reste de la navigation passe dans un menu repliable, scrollable, refermable au clic et a `Escape`
- la top bar ne doit plus ressembler a une nav desktop compressee

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
- header partage: `src/components/SiteHeader.astro`
- fermeture et sync du menu mobile: script inline dans `src/layouts/BaseLayout.astro`
- promesse et familles de sujets: `src/content/home-content.ts`, `src/components/sections/Hero.tsx`, `src/components/sections/About.tsx`

## Positionnement actif
- coeur: systemes electroniques specifiques
- familles rendues visibles: electronique, automatisme, energie, stockage, optimisation
- l'embarque reste une competence, pas le libelle principal du metier
- les projets multi-techniques sont portes avec les partenaires adaptes
- le lab n'est plus une surface publique produit

## Etat courant
- preview white-contrast valide
- production white-contrast valide
- top bar mobile modernisee en preview
- production republee avec la top bar mobile via GitHub Actions `23096174775`
- preview republie avec le positionnement electronique/automatisme/energie/stockage/optimisation via `23098262445`
- production republiee avec le meme positionnement via `23098335508`
- hero blanc recadre sur une vraie image d'oscilloscope
- ancienne texture `hero-carnet-labo-open-v2` retiree du hero actif en high-contrast
- le lab n'est plus publie sur preview ni sur production (`404` sur `/preview/lab/` et `/lab/`)
- verification locale reproductible avec le `User-Agent` du workflow
- controle navigateur humain encore requis pour la validation UX finale

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
