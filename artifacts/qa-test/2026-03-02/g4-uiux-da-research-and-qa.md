# G4 — Recherche UI/UX + QA responsive DA

Date: 2026-03-02  
Owner: Design/QA

## Decisions appliquees

1. References GitHub dans Projets:
- mode retenu: **top 3 + lien "voir plus"**

2. Tracking GitHub:
- events GA4 dedies ajoutes:
  - `outbound_github_project`
  - `outbound_github_contact`

3. QA immediate:
- passe responsive effectuee en local sur 390/768/1024/1440

## Verifications locales

### Build/qualite
- `npm run typecheck` -> OK
- `npm run build` -> OK

### Captures responsive
- `artifacts/qa-test/2026-03-02/home-390.png`
- `artifacts/qa-test/2026-03-02/home-768.png`
- `artifacts/qa-test/2026-03-02/home-1024.png`
- `artifacts/qa-test/2026-03-02/home-1440.png`

### Lighthouse (local preview)
- mobile: `artifacts/qa-test/2026-03-02/lighthouse-home-mobile-v5.json`
  - Performance: **54**
  - Accessibility: **100**
  - Best Practices: **100**
  - SEO: **100**
- desktop: `artifacts/qa-test/2026-03-02/lighthouse-home-desktop-v5.json`
  - Performance: **90**
  - Accessibility: **100**
  - Best Practices: **100**
  - SEO: **100**

## Etat P1

- Harmonisation sections: OK
- Footer knowledge/protocoles: OK
- QA responsive/accessibilite/perf: **partiel**
  - responsive + accessibilite: OK local
  - perf mobile: sous cible (objectif >= 90 non atteint)

## Prochain levier anti-blocage

1. Reduire l'hydration client sur zones non critiques (objectif: baisse TBT mobile)
2. Confirmer en prod les mesures Lighthouse (environnement GitHub Pages)
3. Passer a Storybook P2 une fois perf mobile stabilisee
