# G3 Verification Evidence (v3) - SEO + Tracking

Date: 2026-03-01

## Vérifications exécutées
- `rg -n "canonical|og:image|twitter:image|application/ld\+json|GTM_CONTAINER_ID|event_category|event_label|destination" index.html`
- `rg -n "data-track=|data-destination=" index.html`
- `sips -g pixelWidth -g pixelHeight assets/og-cover.jpg`
- `cat robots.txt`
- `cat sitemap.xml`
- `python3 -m http.server 4173` puis:
  - `curl -I http://127.0.0.1:4173/`
  - `curl -s http://127.0.0.1:4173/robots.txt`
  - `curl -s http://127.0.0.1:4173/sitemap.xml`

## Résultats attendus/observés
- Canonical présent et fixé sur `https://electron-rare.github.io/`.
- OG/Twitter image renseignée vers `assets/og-cover.jpg` (URL absolue).
- JSON-LD `Person` enrichi (`jobTitle`, `description`, `sameAs`).
- Contrat dataLayer conforme (`event_category`, `event_label`, `destination`).
- `assets/og-cover.jpg` présent en `1200x630`.
- `robots.txt` et `sitemap.xml` accessibles.
- HTTP local `/` retourne `200 OK`.

## Contrôles manuels restants (production)
- Publier le conteneur GTM réel et remplacer `GTM-REPLACE_ME`.
- Vérifier la remontée GA4 Realtime des événements clés.
- Valider les aperçus sociaux via LinkedIn Post Inspector/Facebook Sharing Debugger.
