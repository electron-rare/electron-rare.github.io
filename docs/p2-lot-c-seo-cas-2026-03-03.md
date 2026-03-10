# P2 Lot C - Pages Cas SEO + Maillage (2026-03-03)

## Routes publiees
- `/cas/studio-core/`
- `/cas/design-produit/`
- `/cas/rd-sonore/`

## SEO checks
Pour chaque page cas:
- `title`: OK
- `meta description`: OK
- `og:title` + `og:description`: OK
- canonical: OK
- schema `CreativeWork`: OK
- lien retour contact `/#contact`: OK

## Maillage
- Landing -> cas: liens `Voir le cas complet`
- Cas -> contact: CTA `Envoyer un brief`

## Tracking
- Contrat DOM `engagement_case_opened`: present sur landing
- Contrat funnel Sprint 2: `npm run tracking:check` PASS

## Preuves
- `docs/qa-artifacts/p2-qa-report.json`

## Verdict
- PASS (Lot C)
