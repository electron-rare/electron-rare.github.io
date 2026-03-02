# G2 DA-01 P0 — Structure layout control-room

Date: 2026-03-02  
Scope: finalisation P0 layout/tokens pour structure `index.astro` (sans changement des contrats publics)

## Changements appliques
- `src/styles/global.css`
  - ajout des regles structurelles DA-01:
    - `nav-main-row`, `nav-tools`, `nav-sub-row`, `nav-sub-chip`
    - `studio-structure`, `structure-grid`, `structure-cell`
    - variantes de grille: `--hero`, `--systems`, `--production`, `--conversion`
    - `footer-grid`, `footer-title`, `footer-copy`, `footer-links`, `footer-link`
  - ajout des breakpoints de composition:
    - mobile `<768`
    - tablette `>=768`
    - desktop large `>=1140`
    - micro-ajustements `<=390`

## Contrats verifies (non modifies)
- Anchors core conserves:
  - `#a-propos`
  - `#projets`
  - `#contact`
- Tracking conserve:
  - events `TRACK_EVENTS` inchanges
  - attributs `data-track` / `data-destination` inchanges
- SEO/GTM non touches dans ce lot.

## Verification technique
- `npm run typecheck` -> OK (0 erreur)
- `npm run build` -> OK (build Astro statique complet)

## Notes
- Ce lot couvre la stabilisation layout/tokens P0.
- Les validations visuelles navigables (390/768/1024/1440) et QA accessibilite fine restent dans P1 QA.
