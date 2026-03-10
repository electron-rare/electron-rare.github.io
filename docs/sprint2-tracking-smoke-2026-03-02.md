# Sprint 2 - Tracking Smoke Test (2026-03-02)

## Environnement
- URL testee: `http://127.0.0.1:4323/`
- Build: `npm run build` -> OK
- Contrat tracking statique: `npm run tracking:check` -> OK

## Events cles verifies (dataLayer)
- `experiment_variant_exposed` -> OK
- `funnel_brief_generated` -> OK
- `funnel_brief_copied` -> OK
- `funnel_contact_submitted` -> OK

Preuve:
- `docs/qa-artifacts/sprint2-qa-report.json` (`tracking.present`, `tracking.missing=[]`)

## Scenarios verifies
1. `?copy=public` puis `?copy=cto` -> variante appliquee et exposee.
2. Contact mode `simple` -> brief copiable + event copy.
3. Contact mode `pro` -> brief copiable + event contact submit.

## Notes
- Script utilise: `scripts/sprint2-qa.cjs`
