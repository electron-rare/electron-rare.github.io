# Sprint C — KPI instrumentation + expérimentation CTA

Date: 2026-03-02
Objectif: rendre l'amélioration conversion mesurable avec un cadre d'expérimentation simple.

## Instrumentation ajoutée

## Événements nouveaux (dataLayer)
- `experiment_variant_exposed`
  - quand: chargement de page
  - payload clé: `da_variant`, `page_path`
- `engagement_scroll_depth`
  - quand: passage des seuils 25/50/75/100%
  - payload clé: `scroll_depth`
- `engagement_section_view`
  - quand: première visibilité de section (`#a-propos`, `#projets`, `#lab-notes`, `#contact`)
  - payload clé: `section_id`
- `cwv_metric`
  - quand: envoi au page hide/visibility hidden
  - payload clé: `metric_name` (`LCP`/`CLS`/`INP`), `metric_value`, `metric_rating`

## Enrichissement des événements CTA existants
- Ajout contextuel sur tous les clics `data-track`:
  - `page_path`
  - `page_title`
  - `da_variant`
  - `link_text`

## KPI recommandés (max 5)
- KPI 1: `cta_hero_contact` CTR (objectif principal mission)
- KPI 2: taux de reach `engagement_section_view` sur `#contact`
- KPI 3: profondeur de scroll 75% (`engagement_scroll_depth`)
- KPI 4: part de sessions `cwv_metric` en rating `good` pour LCP
- KPI 5: outbound qualifié (`outbound_linkedin_contact` + `outbound_malt_contact`)

## Plan A/B léger (sans dérive DA)

## Expérience 1 — Ordre CTA hero
- Variante A: `Profil expert -> Demarrer mission -> Voir les cas d'usage`
- Variante B: `Demarrer mission -> Profil expert -> Voir les cas d'usage`
- Mesure: hausse de `cta_hero_contact` sans baisse de `engagement_section_view` sur `#projets`

## Expérience 2 — Microcopy rail contact
- Variante A: "Choisir le canal de contact mission"
- Variante B: "Demarrer un cadrage en 24-48h"
- Mesure: delta sur `outbound_linkedin_contact` / `outbound_malt_contact`

## Expérience 3 — Guidance hero
- Variante A: texte guidance présent
- Variante B: guidance plus courte
- Mesure: `engagement_scroll_depth` 50/75 + CTR CTA hero

## Règles d'exécution
- Durée minimale par test: 7 jours ou volume statistique suffisant.
- Un seul test majeur actif à la fois.
- Critère d'arrêt: uplift conversion + stabilité CWV.

## Checklist exploitation
- [ ] Créer tags/variables GA4 pour les nouveaux events
- [ ] Construire un dashboard simple (Looker Studio ou GA4 explorations)
- [ ] Marquer les périodes d'expérience (annotation)
- [ ] Décider rollout/revert à la fin de chaque test

