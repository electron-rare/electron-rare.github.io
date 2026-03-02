# DA-00 — Home page Figma capture log (2026-03-02)

## Run MCP — Rupture DA (Schematique / PCB / Mixte / Inventeur)
- Fichier Figma actif: [Home_ElectronRare_DA_Rupture_2026-03-02](https://www.figma.com/design/Wzk5HhOqRHMhflwz0rpv7w)
- Claim URL creation initiale: `https://www.figma.com/integrations/claim/Wzk5HhOqRHMhflwz0rpv7w`
- Team: `team::1358840601337404242`

### Capture de base (new file)
1. Base seed (`newFile`)
   - `captureId`: `7e060f95-5a39-41d3-be46-efa55bc3413f`
   - Résultat: **completed**
   - Cible seed locale: `http://127.0.0.1:4174/.figma-capture-home.html`

### Captures variantes V1 (premier passage)
1. Schematique
   - `captureId`: `976d72f8-6fa5-42df-8319-93dbdd2fd262`
   - Résultat: **completed**
   - URL: `http://127.0.0.1:4174/.figma-variant-schematique.html`
2. PCB
   - `captureId`: `97612211-b767-42ad-8b33-d6f4e36344f2`
   - Résultat: **completed**
   - URL: `http://127.0.0.1:4174/.figma-variant-pcb.html`
3. Mixte
   - `captureId`: `d133b772-f655-4c27-a9e0-eb2b0200e2f9`
   - Résultat: **completed**
   - URL: `http://127.0.0.1:4174/.figma-variant-mixte.html`
4. Inventeur
   - `captureId`: `3f02a924-8183-4b17-aa10-35e435a3a197`
   - Résultat: **completed**
   - URL: `http://127.0.0.1:4174/.figma-variant-inventeur.html`

### Captures variantes V2 (rupture forte + images/effects)
Assets locaux créés:
- `tmp/figma-seeds/assets/schematique.svg`
- `tmp/figma-seeds/assets/pcb.svg`
- `tmp/figma-seeds/assets/mixte.svg`
- `tmp/figma-seeds/assets/inventeur.svg`

Pages seed V2:
- `tmp/figma-seeds/schematique-v2.html`
- `tmp/figma-seeds/pcb-v2.html`
- `tmp/figma-seeds/mixte-v2.html`
- `tmp/figma-seeds/inventeur-v2.html`

1. Schematique V2
   - `captureId`: `0bd6ae00-73de-46ad-8de1-8b399e413f7b`
   - Résultat: **completed**
2. PCB V2
   - `captureId`: `a68cb587-1c70-4a1f-a09f-283cafac3815`
   - Résultat: **completed**
3. Mixte V2
   - `captureId`: `f5df8e47-2e38-4f65-9eec-a4c3bc1bbc27`
   - Résultat: **completed**
4. Inventeur V2
   - `captureId`: `04faade2-0c06-4745-aa91-e99035f2afcc`
   - Résultat: **completed**

### Capture hybride demandée (PCB + Carnet)
1. Hybride "Traces, vias, impact" + "Carnet de labo vivant"
   - Fichier seed: `tmp/figma-seeds/hybride-traces-carnet-v2.html`
   - `captureId`: `0fe7fb6c-8528-4cf6-8225-7d47861f79d2`
   - Résultat: **completed**
   - Statut: injecté dans le même fichier Figma `Wzk5HhOqRHMhflwz0rpv7w`

2. Carnet de labo electronique (assets mesure + PCB)
   - Fichier seed: `tmp/figma-seeds/carnet-labo-electronique-v2.html`
   - Assets:
     - `tmp/figma-seeds/assets/mesure-rig.svg`
     - `tmp/figma-seeds/assets/pcb-board-hero.svg`
   - `captureId`: `e8505835-a80e-48b8-beb4-818e63db9535`
   - Résultat: **completed**
   - Statut: injecté dans le même fichier Figma `Wzk5HhOqRHMhflwz0rpv7w`

### Etat à ce stade
- Le fichier Figma contient bien une base + plusieurs captures variantes avec ruptures visuelles fortes.
- Les variantes V2 intègrent désormais des images SVG dédiées, effets de glow/texture, et layouts distincts.
- Le point encore ouvert est la production systématique des **4 breakpoints explicites par variante** (`390/768/1024/1440`) en frames séparées dans Figma.

## Scope exécuté
- Objectif: capturer la home page statique `index.html` avec style `styles.css` pour DA-00 (Desktop/Mobile)
- Branchement cible: `http://127.0.0.1:4174/`
- Typo/Palette: conforme aux tokens déjà en place dans :
  - `notes-interne/creative-direction-brief.md`
  - `specs/site-github-pages-spec.md`

## Fichier créé (obligatoire)
1. Capture 390 (`newFile`) — Team utilisée: `team::1358840601337404242` (Full seat)
   - `captureId`: `d42b3736-86a0-4317-aba3-db38e3fd8081`
   - Viewport exécuté: `390x2600`
   - Résultat: **completed**
   - Claim URL: `https://www.figma.com/integrations/claim/fnqOdDOU97v7E27LxkV7cn`
2. Capture 390 de secours (réémission initiale) :
   - `captureId`: `8e837489-b410-4fe6-bcd9-164cfc06ea28`
   - Viewport exécuté: `390x2600`
   - Résultat: **completed**
   - Claim URL: `https://www.figma.com/integrations/claim/ZKgr7hsRPsU9FxZ1D3C9CC`
3. Capture 768 (`newFile`) :
   - `captureId`: `a592d67e-df53-427a-bbc1-451b2cd00072`
   - Viewport exécuté: `768x2600`
   - Résultat: **completed**
   - Claim URL: `https://www.figma.com/integrations/claim/zAedZvfZMYMxY1UfnKftGr`
4. Capture 1024 (`newFile`) :
   - `captureId`: `e5039698-8d12-4fbb-b67c-556cc3af48be`
   - Viewport exécuté: `1024x2600`
   - Résultat: **completed**
   - Claim URL: `https://www.figma.com/integrations/claim/6ZP1SHZVN5rgWrig10Lh9i`
5. Capture 1440 (`newFile`) :
   - `captureId`: `b7aa2fbd-d715-4522-8b22-acdd6d058b28`
   - Viewport exécuté: `1440x2600`
   - Résultat: **completed**
   - Claim URL: `https://www.figma.com/integrations/claim/ZMeMDAbbfYnDMgfXOeIDA4`

## Etat actuel
- Le fichier Figma de base est bien créé.
- `existingFile` pour regrouper plusieurs tailles dans le même fichier reste bloqué côté accès MCP (message: `This figma file could not be accessed`) avec `fileKey` de claim.

## Blocage détecté
- Les appels `existingFile` pour:
  - `ZKgr7hsRPsU9FxZ1D3C9CC`
  - `fnqOdDOU97v7E27LxkV7cn`
  - `zAedZvfZMYMxY1UfnKftGr`
  - `6ZP1SHZVN5rgWrig10Lh9i`
  - `ZMeMDAbbfYnDMgfXOeIDA4`
  retournent systématiquement:
  - `This figma file could not be accessed.`
- Docs Figma: mode probable “claim non consommé / résolution du vrai fileKey et permissions” en cours.

## TODO d’exécution prêt à lancer
1. Réclamer les 4 claims ci-dessus depuis la session Figma connectée (ou les ouvrir en parallèle).
2. Pour chaque claim, nommer l’artboard:
   - `Home 390`
   - `Home 768`
   - `Home 1024`
   - `Home 1440`
3. Fusionner les 4 captures dans un seul fichier Figma (ou en garder un fichier par breakpoint si la contrainte de claim persiste).
4. Structurer selon la logique DA-00:
   - `Header`
   - `Hero + Identité`
   - `Systèmes`
   - `Production`
   - `Conversion`
   - `Footer`
5. Vérifier `#a-propos`, `#projets`, `#contact` visuellement.
6. Ajouter composants + variantes (`default`, `hover`, `focus-visible`, état lab collapsed/expanded si utilisé).
7. QA finale visuelle: overflow, lisibilité mobile, contraste CTA.
8. Archiver la preuve (captures + noms d’artboards + lien final) dans `artifacts/figma-capture/2026-03-02`.

## Capture alignement prod v12 (2026-03-02 14:00 CET)
- Mode: `existingFile`
- Fichier cible: [Home_ElectronRare_DA_Rupture_2026-03-02](https://www.figma.com/design/Wzk5HhOqRHMhflwz0rpv7w)
- `captureId`: `6bbd4ed4-522b-4564-9628-293461a662f3`
- Source capture: `http://localhost:4321/?da=v12`
- Résultat: **completed**
- Note: script de capture Figma chargé conditionnellement via `#figmacapture=` dans `src/layouts/BaseLayout.astro` (non actif hors capture).
