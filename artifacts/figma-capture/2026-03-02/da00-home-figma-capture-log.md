# DA-00 — Home page Figma capture log (2026-03-02)

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
