# Figma ↔ Web Parity Checklist — Home Carnet de labo

> Statut 2026-03-14: document historique.
> La parite Figma de cette phase ne pilote plus la homepage active.

Date: 2026-03-02  
Figma file: `Wzk5HhOqRHMhflwz0rpv7w`  
Statut Figma MCP: quota atteint sur seat (verification manuelle requise pour capture exacte)

## Methodologie
- Reference desktop: frame large validee dans Figma
- Reference smartphone: frame mobile validee dans Figma
- Verification web: `localhost:4321` sur 390 / 768 / 1024 / 1440

| Bloc | Desktop attendu | Mobile attendu | Implémente | Écart | Action |
|---|---|---|---|---|---|
| Hero titre + sous-titre | hiérarchie premium technique, 2 niveaux | lignes courtes, scan instantané | oui | faible | ajuster retours ligne selon frame Figma final |
| Hero assets (routing/instrument/carnet) | 2 cartes droite + carnet gauche | simplification visuelle + low-noise | partiel | moyen | brancher assets v2 + fallback mobile |
| Nav | title mono + 3 anchors | compacte, lisible, sans wrap agressif | oui | faible | micro-ajuster tracking/letter spacing |
| Grille blocs bas (9) | cartographie 3x3 | stack vertical claire | oui | faible | harmoniser wording Figma final |
| Section flow/pipeline | lisible, orientée décision | non tronquée | oui | faible | QA wording mobile |
| Projets/Lab notes | preuve -> impact | lisible et non dense | oui | moyen | simplifier certaines descriptions mobiles |
| Confiance/Contact | CTA prioritaire visible | CTA au-dessus du pli | oui | faible | valider contraste mode normal + contraste |
| Footer | proposition claire studio premium | compact mais complet | oui | faible | aucun |

## Priorites de correction
1. Hero assets v2 + fallback mobile low-noise
2. Retours à la ligne Hero/Nav sur 390
3. Contraste CTA en mode normal + mode contraste

## Evidence attendue
- captures `artifacts/da-qa/2026-03-02/`:
  - `home-v12-390.png`
  - `home-v12-768.png`
  - `home-v12-1024.png`
  - `home-v12-1440.png`
