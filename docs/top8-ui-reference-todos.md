# Top 8 UI Reference TODOs - Electron Rare

Date: 2026-03-01
Scope: `src/pages/index.astro` + `src/styles/global.css`
DA lock: `editorial-premium` + `subtle-precise` + `warm-artistic`
Conversion lock: CTA principal LinkedIn, CTA secondaire Malt

## 1) Hero "manifeste laboratoire" (ref 1024 + maker)
Status: DONE (2026-03-01)
Source references:
- https://www.1024architecture.net/
- https://hackaday.com/
Tasks:
- `src/pages/index.astro`: ajouter un mini-manifeste en 3 lignes dans le hero (creation electronique, invention systeme, design produit).
- `src/styles/global.css`: ajouter un style `hero-manifest` en colonnes avec marqueurs "signal".
Acceptance:
- Message de valeur visible sans scroll sur mobile 390px.
- Aucun conflit de lisibilite avec la palette atelier (ivoire/encre/cuivre).

## 2) Timeline projets datee (ref Screen Club)
Status: DONE (2026-03-01)
Source references:
- https://www.screen-club.com/
Tasks:
- `src/pages/index.astro`: inserer une timeline compacte apres `Projects` (annee + titre + type + lien).
- `src/styles/global.css`: ajouter un rail vertical avec nodes et etat actif.
Acceptance:
- Lecture chronologique en <10 secondes.
- Focus clavier visible sur chaque lien timeline.

## 3) Bloc "Lab Notes" recurrent (ref Hackaday)
Status: DONE (2026-03-01)
Source references:
- https://hackaday.com/
- https://www.instructables.com/
Tasks:
- `src/pages/index.astro`: ajouter section `Lab Notes` avec 3 cartes datees.
- `src/styles/global.css`: styler cartes style carnet de labo (header horodate + barres de signal).
Acceptance:
- Structure fixe `Intent -> System -> Build -> Test -> Result` lisible dans chaque carte.
- Pas d'overflow a 390px.

## 4) Bandeau "system pipeline" (ref maker docs + 1024)
Status: DONE (2026-03-01)
Source references:
- https://www.1024architecture.net/about/
- https://learn.adafruit.com/
Tasks:
- `src/pages/index.astro`: ajouter bandeau horizontal "Research -> Prototype -> Runtime -> Deployment".
- `src/styles/global.css`: animer le flux avec cadence lente et `prefers-reduced-motion`.
Acceptance:
- Pipeline comprehensible en un coup d'oeil.
- Animation desactivee automatiquement si reduced motion.

## 5) Navigation "console sticky" renforcee (ref Studio Hemisphere)
Status: DONE (2026-03-01)
Source references:
- https://studio-hemisphere.com/
Tasks:
- `src/pages/index.astro`: ajouter un etat texte court dans le header (`STATUS: LIVE EXPERIMENT`).
- `src/styles/global.css`: renforcer style console (scanline, jitter leger, progress line) sans surbruit.
Acceptance:
- Header reste lisible et non intrusif pendant scroll.
- Aucun tremblement global hors lien actif.

## 6) Bloc confiance "preuves" (ref Screen Club + SparkFun)
Status: DONE (2026-03-01)
Source references:
- https://www.screen-club.com/about/
- https://www.sparkfun.com/success
Tasks:
- `src/pages/index.astro`: ajouter ligne de preuves ("collaborations", "projets actifs", "liens verifiables").
- `src/styles/global.css`: badges compacts avec contraste fort.
Acceptance:
- Bloc visible avant section Contact.
- CTA de contact reste element le plus actionnable.

## 7) Module CTA dual clair (ref CRO guardrail)
Status: DONE (2026-03-01)
Source references:
- https://www.nngroup.com/articles/ten-usability-heuristics/
- https://baymard.com/
Tasks:
- `src/pages/index.astro`: harmoniser un duo de CTA fixe par section cle (LinkedIn primaire, Malt secondaire).
- `src/styles/global.css`: etats hover/focus/active homogennes et accessibles.
Acceptance:
- Differenciation primaire/secondaire explicite visuellement.
- Evenements tracking existants non casses.

## 8) Footer "knowledge + protocoles"
Status: TODO
Source references:
- https://www.adafruit.com/
- https://www.hackster.io/
Tasks:
- `src/pages/index.astro`: enrichir footer avec 3 liens: process, stack, contact pro.
- `src/styles/global.css`: style footer en grille technique simple.
Acceptance:
- Footer apporte contexte pro sans alourdir.
- Liens externes trackables et testables.

## Execution order (recommande)
1. TODO 5 (nav) + TODO 7 (CTA) pour securiser conversion.
2. TODO 1 (hero) + TODO 6 (preuves) pour clarte business.
3. TODO 2 (timeline) + TODO 3 (lab notes) pour profondeur portfolio.
4. TODO 4 (pipeline) + TODO 8 (footer) pour finaliser coherence studio.

## QA minimal a chaque TODO
- `npm run typecheck`
- `npm run build`
- test visuel 390/768/1024/1440
- navigation clavier complete
- verification `prefers-reduced-motion`
