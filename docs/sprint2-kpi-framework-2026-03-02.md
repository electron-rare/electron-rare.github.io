# Sprint 2 - KPI Framework GA4 (Baseline)

## Objectif pilotage
Mesurer exposition de variante, progression funnel brief, et conversion contact.

## KPI coeur
1. Exposition variante
- Event: `experiment_variant_exposed`
- Dimension: `copy_variant`, `copy_source`, `audience_mode`
- Usage: verifier repartition `public` vs `cto`.

2. Generation de brief
- Event: `funnel_brief_generated`
- Dimension: `source`, `product`, `constraint`, `deadline`
- Usage: mesurer adoption du configurator.

3. Copie de brief
- Event: `funnel_brief_copied`
- Dimension: `source`, `brief_chars`
- Usage: indicateur d'intention qualifiee.

4. Soumission contact
- Event: `funnel_contact_submitted`
- Dimension: `source`, `brief_chars`
- Usage: conversion finale.

## Ratios cibles (tableau de bord)
- `brief_copy_rate = funnel_brief_copied / funnel_brief_generated`
- `contact_submit_rate = funnel_contact_submitted / experiment_variant_exposed`
- `qualified_submit_rate = funnel_contact_submitted(source=contact_form) / funnel_contact_submitted(total)`

## Baseline technique (smoke)
- Presence des 4 events: OK (voir `docs/sprint2-tracking-smoke-2026-03-02.md`).
