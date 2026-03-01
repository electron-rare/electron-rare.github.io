# G2 Implement Evidence (v3) - SEO + Acquisition

Date: 2026-03-01

## Portée implémentée
- SEO technique: canonical, robots, sitemap, OG/Twitter image.
- Tracking contract: événements CTA/outbound avec `event_category`, `event_label`, `destination`.
- Bootstrap GTM prêt à brancher (`GTM-REPLACE_ME`).
- Conversion UX: section contact enrichie + trust points.
- Accessibilité/réactivité: skip-link déjà présent + réglage ultra-mobile (`<=390px`).

## Fichiers modifiés
- `index.html`
- `assets/styles.css`
- `docs/github-pages-deploy.md`
- `robots.txt` (nouveau)
- `sitemap.xml` (nouveau)
- `assets/og-cover.jpg` (nouveau)

## Mapping tracking (event -> destination)
| Event | Type | Destination | Usage |
|---|---|---|---|
| `cta_hero_projets` | CTA interne | `#projets` | Navigation vers section projets |
| `cta_hero_contact` | CTA interne | `#contact` | Navigation vers section contact |
| `cta_hero_profile` | CTA interne | `#a-propos` | Navigation vers section profil |
| `outbound_linkedin_project` | Sortant | `linkedin.com` | Preuve sociale projet |
| `outbound_linkedin_contact` | Sortant | `linkedin.com` | Conversion primaire |
| `outbound_malt_contact` | Sortant | `malt.com` | Conversion secondaire |
| `outbound_bandcamp_project` | Sortant | `bandcamp.com` | Projet musical |
| `outbound_bandcamp_contact` | Sortant | `bandcamp.com` | Contact alternatif |

Paramètres communs poussés:
- `event_category=engagement`
- `event_label=<event_name>`
- `destination=<domain|anchor>`

## Notes
- Pour activer GTM en production: remplacer `GTM-REPLACE_ME` dans le script head et le bloc noscript.
- URL canonique actuelle: `https://electron-rare.github.io/`.
