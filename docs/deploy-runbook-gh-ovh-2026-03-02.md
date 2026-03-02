# Deploy Runbook — GH Pages + OVH SFTP (Home Carnet labo)

Date: 2026-03-02

## Préflight
1. `npm run tracking:check`
2. `npm run build`
3. `npm run build:external` (inclut `/lab/`)

## GH Pages
1. Vérifier branche de publication (repo settings Pages).
2. Pousser le commit de release.
3. Attendre pipeline GitHub Actions Pages.
4. Smoke test:
- `/`
- `/#a-propos`
- `/#projets`
- `/#contact`
- `/lab/`

## OVH mutualisé (SFTP)
1. Configurer secrets hors repo:
- `OVH_SFTP_HOST`
- `OVH_SFTP_USER`
- `OVH_SFTP_PORT` (défaut 22)
- `OVH_SFTP_PATH`
- mot de passe via prompt sécurisé
2. Déploiement:
- `npm run deploy:web:sftp`
3. Smoke test domaine OVH:
- home
- ancres
- assets hero
- `/lab/`

## Checklist post-release
1. Aucun 404 sur assets `public/assets/da/openai/*`
2. CTA tracks présents (`data-track-event`)
3. Aucun overflow horizontal mobile
4. Contraste CTA conforme en mode normal + contraste

## Rollback rapide
1. Re-déployer le dernier `dist` stable.
2. Revenir au commit précédent et repush.
3. Purger cache CDN/hébergement si nécessaire.
