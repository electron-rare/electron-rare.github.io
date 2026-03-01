# G3 Verification Evidence (v4) - Full TODO Validation Pass

Date: 2026-03-01

## Lighthouse (local)
Source URL testée: `http://127.0.0.1:4173/`

### Mobile
- performance: **93**
- accessibility: **95**
- best-practices: **96**
- seo: **100**

### Desktop
- performance: **100**
- accessibility: **95**
- best-practices: **96**
- seo: **100**

Artifacts JSON:
- `artifacts/qa-test/2026-03-01/lighthouse-home-mobile-v1.json`
- `artifacts/qa-test/2026-03-01/lighthouse-home-desktop-v1.json`

## Validations structurelles
- JSON-LD `Person`: **OK** (`jobTitle`, `description`, `sameAs` présents)
- `sitemap.xml` parse XML: **OK**
- `robots.txt` présent et exploitable: **OK**
- `assets/og-cover.jpg` dimensions: **1200x630**
- Contrat tracking (`event_category`, `event_label`, `destination`): **OK**

## TODO status final
- ✅ Canonical / OG / Twitter / sitemap / robots
- ✅ Tracking contract côté front
- ✅ Lighthouse archivé
- ✅ GTM réel configuré (`GTM-5SLM67QF`)
- ⏳ Validation GA4 Realtime en production
- ⏳ Debugger aperçu social en production (action externe)
