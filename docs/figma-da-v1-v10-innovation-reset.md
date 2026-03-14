# DA Reset — V1→V10 (version visuelle radicale)

> Statut 2026-03-14: document historique d'exploration DA.
> Il ne pilote plus la version publique active.
> Memoire active: `docs/design-memory-2026-03-14-white-contrast.md`.

Je remets la piste à zéro avec 10 directions distinctes.  
But: rupture visuelle réelle + identité électronique forte + conversion non cassée.

| Version | Nom direction | Idée visuelle | Différentiateur principal | Priorité |
|---|---|---|---|---|
| V1 | Schématique Pure | Blueprint froid, axes géométriques stricts | Topologie lisible de section en section | Conversion-safe |
| V2 | Schématique Brut | Contraste dur + lignes de force agressives | Rupture nette vs baseline sans perdre la structure | Expérimental |
| V3 | Schématique Tactile | Maillage + micro-nodos | Navigation perçue comme plan de commande | Conversion-safe |
| V4 | PCB Routage Noir | Traces, vias, pads, rails visuels | Identité hardware immédiatement lisible | Forte rupture |
| V5 | PCB Rouge-Cuivre | Accent cuivre/ambre + cyan de signal | ADN technique affirmé sans surcharge | Forte rupture |
| V6 | PCB Industriel | Superficie matte + textures techniques fines | Ton usine/création + hiérarchie solide | Premium industriel |
| V7 | Mixte Calme | Premium editorial + infobulles tech discrètes | Bon compromis produit | Safe/Stable |
| V8 | Mixte Développeur | Layout en panneau + repères API/flux | Vitesse de scan très haute | Conversion |
| V9 | Inventeur Journal | Style carnet de labo visuel + annotations | Positionnement humain et créatif | Narratif |
| V10 | Inventeur-Action | Timeline courte + preuve d'impact | Accent sur résultats/next-step | Conversion |

## Règles de reset (strictes)
- Ancre + parcours conservés:
  - `#a-propos`, `#projets`, `#contact`
- CTA principaux inchangés:
  - `Voir les projets`
  - `Démarrer une mission`
  - `Voir le profil`
- Tracking GA4/SEO non modifié.
- Mobile 390: priorité absolue à la lisibilité CTA + absence d'overflow.

## Cartes de test à lancer maintenant
1. Lancer les captures locales pour 10 variantes à 390/768/1024/1440.
2. Filtrer en scoring `lisibilité`, `rupture`, `conversion`.
3. Garder un trio court de passage:
   - V4 (PCB Routage Noir)
   - V1 (Schématique Pure)
   - V7 (Mixte Calme)

## Livrables de preuve déjà disponibles
- `artifacts/da-qa/2026-03-02/v10-preview/v{version}-{breakpoint}.png`
- `artifacts/da-qa/2026-03-02/gh-variants-v8-v11-qa-report.md`

## Prochaine phase Figma (après validation)
- Générer un fichier Figma dédié au reset avec:
  - 10 pages `V1 ... V10`
  - 4 frames par page: `390`, `768`, `1024`, `1440`
  - Composants partagés `CTA`, `Card`, `Pill`, `Nav`, `Footer`
  - États `default/hover/focus-visible`

## Recommandation de validation rapide (6 min)
- `V4` et `V5`: rupture max
- `V1` et `V7`: conversion stable
- `V9` et `V10`: personnalité forte
