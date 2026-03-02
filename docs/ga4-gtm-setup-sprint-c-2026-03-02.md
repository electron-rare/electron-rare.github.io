# GA4 + GTM setup — Sprint C

Date: 2026-03-02
Scope: web container GTM + propriété GA4 pour exploiter les nouveaux events instrumentés.

## 1) Events à capter (déjà poussés dans `dataLayer`)
- `experiment_variant_exposed`
- `engagement_scroll_depth`
- `engagement_section_view`
- `cwv_metric`
- + events CTA existants (`cta_hero_*`, `outbound_*`, etc.)

## 2) Variables GTM recommandées
Créer en **Data Layer Variable**:
- `destination`
- `page_path`
- `page_title`
- `da_variant`
- `link_text`
- `scroll_depth`
- `section_id`
- `metric_name`
- `metric_value`
- `metric_rating`

## 3) Trigger GTM
Créer des **Custom Event triggers**:
- Trigger `EVT - experiment_variant_exposed` (event name exact: `experiment_variant_exposed`)
- Trigger `EVT - engagement_scroll_depth` (event name: `engagement_scroll_depth`)
- Trigger `EVT - engagement_section_view` (event name: `engagement_section_view`)
- Trigger `EVT - cwv_metric` (event name: `cwv_metric`)

## 4) Tags GA4 Event
Créer un tag GA4 Event par trigger (ou un tag paramétrable unique), avec paramètres:
- `destination` -> `{{DLV - destination}}`
- `page_path` -> `{{DLV - page_path}}`
- `page_title` -> `{{DLV - page_title}}`
- `da_variant` -> `{{DLV - da_variant}}`
- `link_text` -> `{{DLV - link_text}}`
- `scroll_depth` -> `{{DLV - scroll_depth}}`
- `section_id` -> `{{DLV - section_id}}`
- `metric_name` -> `{{DLV - metric_name}}`
- `metric_value` -> `{{DLV - metric_value}}`
- `metric_rating` -> `{{DLV - metric_rating}}`

Remarque: pour chaque tag, les paramètres non présents dans l’event restent vides, c’est acceptable.

## 5) Custom definitions GA4 (Admin > Custom definitions)
Créer au minimum:
- Dimension event-scoped: `da_variant`
- Dimension event-scoped: `destination`
- Dimension event-scoped: `section_id`
- Dimension event-scoped: `metric_name`
- Dimension event-scoped: `metric_rating`
- Metric event-scoped (si utile): `metric_value` (sinon laisser en param brut dans Explore)

## 6) Debug et validation
1. GTM Preview + Tag Assistant.
2. Vérifier déclenchement des 4 nouveaux events.
3. GA4 DebugView: présence des paramètres clés.
4. Realtime: vérifier flux d’événements pendant navigation réelle.

## 7) Dashboard KPI recommandé
- `cta_hero_contact` CTR
- reach `engagement_section_view` sur `section_id=contact`
- part de sessions avec `engagement_scroll_depth >= 75`
- distribution `cwv_metric` où `metric_name=LCP` par `metric_rating`
- ratio `outbound_linkedin_contact` vs `outbound_malt_contact`

## Sources officielles
- Data layer (GTM): https://developers.google.com/tag-platform/tag-manager/datalayer
- GA4 events: https://developers.google.com/analytics/devguides/collection/ga4/events
- DebugView: https://support.google.com/analytics/answer/7201382
- Web Vitals: https://web.dev/articles/vitals
