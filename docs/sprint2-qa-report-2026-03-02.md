# Sprint 2 - Rapport QA (2026-03-02)

## Portee
- Responsive: 390x844, 768x1024, 1024x768, 1440x900
- Accessibilite: navigation clavier, focus visibles, reduced motion
- Source de preuve: `docs/qa-artifacts/sprint2-qa-report.json`

## Resultats responsive
- 390x844: OK (`Hero` visible, `#contact` accessible)
- 768x1024: OK
- 1024x768: OK
- 1440x900: OK

Captures:
- `docs/qa-artifacts/responsive-390x844.png`
- `docs/qa-artifacts/responsive-768x1024.png`
- `docs/qa-artifacts/responsive-1024x768.png`
- `docs/qa-artifacts/responsive-1440x900.png`

## Resultats accessibilite
- Navigation clavier: OK (skip link -> nav -> contrast toggle -> hero actions)
- Elements interactifs via tablist/tab presents: `audienceTabCount = 6`
- `prefers-reduced-motion`: OK (`signalDot` masques)

## Statut
- 0 bug bloquant observe sur le scope Sprint 2.
- Gate QA Sprint 2: PASS.
