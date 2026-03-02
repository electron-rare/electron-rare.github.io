# Propositions DA pour Figma (Home) — 3 directions

Source de base: `Home_ElectronRare_DA00_2026-03-02_Final`
Lien source: [Home_ElectronRare_DA00_2026-03-02_Final](https://www.figma.com/design/fnqOdDOU97v7E27LxkV7cn/Home_ElectronRare_DA00_2026-03-02_Final)

## Instructions de déclinaison Figma (rapide)

1. Dupliquer le fichier source dans Figma.
2. Créer 3 pages:
   - `DA-Proposition-A Editorial`
   - `DA-Proposition-B Lab-Noise`
   - `DA-Proposition-C Conversion`
3. Sur chaque page, créer 4 artboards:
   - `390`, `768`, `1024`, `1440`.
4. Pour chaque proposition, appliquer:
   - palette
   - typographie
   - textures/ornement
   - hiérarchie des CTA
   - motion states (default / hover / focus-visible)
5. Conserver les ancres et contenus obligatoires: `#a-propos`, `#projets`, `#contact`.

## Proposition A — Editorial Premium Warm

- **Ambition**: sobriété forte, très premium, lisible business-first.
- **Palette**
  - Fond: `#f7f2e9` / `#efe6d8`
  - Texte: `#1e1c17` / `#2f2a22`
  - Accent cuivre: `#a56c43`
  - Accent cyan très soft: `#1f6f8b` (1 seul usage)
- **Typo**
  - Titres: `Fraunces` (display), tracking serré
  - Corps: `Manrope` 16-18px
  - Infos: `IBM Plex Mono` 13-14px
- **Hero**
  - Supprimer la surcharge visuelle, garder un seul halo principal.
  - CTA primaire `Voir les projets` en bloc principal, secondaire `Lancer une mission` en outlined.
- **Sections**
  - Systèmes: cards verticales, beaucoup d’air, bordures fines.
  - Projets: 3 cartes + “Voir plus” + bloc dédié GitHub.
  - Proof + Contact: densité réduite, plus de liste vérifiable.
- **Motion**
  - Entrées fade + translateY 12px, 250ms.
  - Aucun grain actif, pas d’animations de fond.
- **Conversion**
  - Zone CTA visible dès la moitié supérieure (hero + 1 bloc de rappel sous projets).
- **Spécifité Figma**
  - Ajouter composants Variants: `CTA/Default`, `CTA/Hover`, `CTA/Focus`.

## Proposition B — Noise / Circuit

- **Ambition**: studio créatif plus agressif sans perdre la conversion.
- **Palette**
  - Fond: `#f3ebe2`
  - Texte: `#12110f`
  - Accent magenta: `#ff2f86`
  - Accent cyan: `#0af7ff`
  - Accent cuivre: `#c07f4a` (micro accents uniquement)
- **Typo**
  - Titres: `Fraunces`
  - Texte: `IBM Plex Sans` / `Manrope` mix selon longueur.
  - Labels techniques en `IBM Plex Mono`.
- **Hero**
  - Ajouter filigrane de grille “circuit” à faible opacité (6-8%).
  - Accentuer badges métiers (`creative coder`, `IA`, `design produit`) sur une bande semi-transparente.
- **Sections**
  - Projets = layout alterné (texte/image-simulée / preuve / CTA).
  - Timeline + Lab notes avec plus de badges de process.
- **Motion**
  - Hover avec 1 micro-oscillation de bordure (120ms) sur cartes.
  - Conserver transition de nav (`focus-visible`) nette.
- **Conversion**
  - Garder couleur de fond contrastée derrière CTA principal.
  - `LinkedIn` et `Malt` en dual rail en priorité conversion.
- **Spécifité Figma**
  - Mettre texture + gradients en calque séparé (toggle visible selon state).

## Proposition C — Conversion Lab (clair/ombre)

- **Ambition**: approche la plus orientée acquisition, haut contraste fonctionnel.
- **Palette**
  - Fond: `#fffdf9`
  - Surface secondaire: `#ece7de`
  - Texte principal: `#1f1b16`
  - Accent: `#2bb7b7`
  - Accent secondaire: `#ff5f35`
- **Typo**
  - Titres: `Fraunces`
  - Texte: `Manrope`
  - Chips/labels micro: `IBM Plex Mono`
- **Hero**
  - Header sticky très lisible + progress bar plus marquée.
  - CTA principal en pleine largeur sur mobile, taille 17-18.
- **Sections**
  - `A-propos` et `Contact` plus compactes, mais plus hiérarchiques.
  - Plus de “preuves” textuelles courtes (2 lignes max par preuve).
- **Motion**
  - `reduce motion`: transitions courtes, focus outlines très visibles.
- **Conversion**
  - Réserver la moitié haute des écrans desktop à la preuve + offre (sans dépendre de la navigation latérale).
  - Ajouter footer “3 preuves + 2 CTA” comme ancre de fermeture.
- **Spécifité Figma**
  - Refaire les composants CTA en style système (2 tailles: mobile/desktop).

## Règles de comparaison (cross-DA)

- Ne pas changer:
  - IDs d’ancrage, labels essentiels des parcours, tracking data-track.
  - Contrat GA4 / événements conversion.
- Vérifier par proposition:
  - Lisibilité WCAG AA des CTA textes.
  - Cohérence mobile `390` (pas d’overflow horizontal).
  - Zoning stable: Header / Hero / Systèmes / Production / Conversion / Footer.
- Sauvegarde recommandée:
  - Exporter un PDF par proposition après validation visuelle (`390/768/1024/1440`).

