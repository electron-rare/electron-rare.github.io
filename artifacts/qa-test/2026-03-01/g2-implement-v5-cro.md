# G2 Implement Evidence (v5) - CRO pass (CTA + contact hierarchy)

Date: 2026-03-01

## Scope implémenté
- Optimisation copy CTA hero sans dérive DA:
  - `Voir les cas d'usage`
  - `Lancer une mission`
- Ajout d'un accès contact rapide au-dessus de la ligne de flottaison:
  - lien `LinkedIn DM` (prioritaire)
  - lien `Malt` (secondaire)
- Refonte section contact en hiérarchie conversion:
  - CTA primaire: `LinkedIn (prioritaire)`
  - CTA secondaire: `Malt (brief mission)`
  - lien tertiaire: `Bandcamp (Electron Fou)`
- Rassurances conversion ajoutées:
  - disponibilité `24-48h`
  - repères confiance orientés mission
- Contrat tracking conservé:
  - mêmes événements GA4/GTM
  - mêmes paramètres (`event_category`, `event_label`, `destination`)

## Fichiers clés modifiés
- `src/components/sections/Hero.tsx`
- `src/components/sections/Contact.tsx`

## Commit associé
- `6626fe1` - feat: improve CRO CTA copy and contact hierarchy
