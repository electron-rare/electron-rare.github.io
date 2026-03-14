# Plan Acquisition / SEO - Etat courant

Updated: 2026-03-14
Status: active
Reference prioritaire: `docs/project-master-todos.md`

## Perimetre reel

- site Astro sur OVH
- preview publique sous `/preview/`
- production publique a la racine
- pages publiques actives:
  - `/`
  - `/formation/`
  - `/mentions-legales/`
  - `robots.txt`
  - `sitemap.xml`
- `lab` non public

## Positionnement SEO a servir

- systemes electroniques specifiques
- electronique
- automatisme
- energie
- stockage
- optimisation
- instrumentation
- projets multi-techniques avec partenaires

## Etat acquis

- canonical production sur `https://www.lelectronrare.fr/`
- preview en `noindex,nofollow,noarchive`
- sitemap public sans `/lab/`
- metadata OG/Twitter recalees sur le positionnement actuel
- tracking nettoye sur les events actifs

## Events actifs a verifier en GA4

- `cta_hero_contact`
- `outbound_linkedin_contact`
- `outbound_email_contact`
- `outbound_github_contact`
- `outbound_github_project_audio_battery`
- `experiment_variant_exposed`
- `engagement_scroll_depth`
- `engagement_section_view`
- `cwv_metric`

## Priorites restantes

### P0
- verifier GA4 Realtime et DebugView sur la prod actuelle
- verifier OG/Twitter avec les outils de debug LinkedIn/Facebook
- verifier Search Console sur la prod actuelle

### P1
- renforcer les exemples concrets sur home et formation pour mieux porter les familles:
  - electronique
  - automatisme
  - energie
  - stockage
  - optimisation
- produire une page ou bloc de preuve plus net sur les partenaires multi-techniques

### P2
- mesurer LCP et budget media sur la variante blanche publique
- consolider un suivi SEO simple:
  - impressions
  - clics
  - CTR
  - pages les plus vues

## Regles

- ne plus mesurer ni documenter `/lab/` comme URL SEO publique
- ne plus documenter de flux GitHub Pages comme prod active
- toute evolution SEO doit rester alignee sur `docs/design-memory-2026-03-14-white-contrast.md`
