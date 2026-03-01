# G3 Verification Evidence (v5) - Tracking Contract + GTM ID

Date: 2026-03-01

## Validation locale du contrat tracking
Commandes exécutées:
- extraction `data-track` et `data-destination` depuis `index.html`
- vérification présence des champs dataLayer (`event_category`, `event_label`, `destination`)

Résultats:
- `tracked_links`: 8
- `missing_destination_count`: 0
- `js_contract_ok`: true
- `missing_required_events`: []

Événements détectés:
- `cta_hero_projets`
- `cta_hero_contact`
- `cta_hero_profile`
- `outbound_linkedin_project`
- `outbound_linkedin_contact`
- `outbound_malt_contact`
- `outbound_bandcamp_project`
- `outbound_bandcamp_contact`

## GTM
- ID configuré: `GTM-5SLM67QF`
- emplacements validés:
  - `window.GTM_CONTAINER_ID`
  - bloc `<noscript>` `ns.html?id=GTM-5SLM67QF`

## Statut restant (production)
- Vérifier GA4 Realtime/DebugView sur URL publique
- Vérifier aperçu social LinkedIn/Facebook
