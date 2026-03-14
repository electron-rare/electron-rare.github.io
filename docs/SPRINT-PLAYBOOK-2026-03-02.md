# Sprint Playbook - White Contrast / Preview / Prod

Updated: 2026-03-14
Repo: `/home/zacus/electron-rare-preview-ovh`

## Sprint A - Theme clair

### A1 - Checks locaux
```bash
cd /home/zacus/electron-rare-preview-ovh
git status --short --branch
npm run typecheck
npm run tracking:check
PUBLIC_SITE_URL=https://www.lelectronrare.fr/preview/ npm run build:external
```

### A2 - Zones a verifier dans le build
- top bar desktop/mobile et hero
- approche et cas concrets
- photo strip et video strip
- formats de mission
- FAQ
- contact `minitel` clair
- footer
- pages `/formation/` et `/mentions-legales/`

### A3 - Points d'attention
- pas de `Mode contraste`
- pas de retour a l'ancienne DA sombre
- pas d'ancre legacy `#projets`
- focus visible sur FAQ et formulaire
- top bar mobile compacte, sans wrap sur plusieurs lignes au chargement
- CTA `Contact` visible hors menu sur mobile
- fermeture du menu au clic, a `Escape` et au resize desktop

## Sprint B - Preview OVH

### B1 - Build preview
```bash
cd /home/zacus/electron-rare-preview-ovh
PUBLIC_SITE_URL=https://www.lelectronrare.fr/preview/ npm run build:external
```

### B2 - Deploy preview
- workflow GitHub Actions: `deploy-ovh-ftp.yml`
- target: `preview`
- remote attendu: `/www/preview`
- verification publique automatique post-deploy via `scripts/verify-public-target.mjs`

### B3 - Verification preview
```bash
curl -fsSI -A 'electron-rare-gh-verify/1.0' https://www.lelectronrare.fr/preview/
curl -fsSI -A 'electron-rare-gh-verify/1.0' https://www.lelectronrare.fr/preview/formation/
curl -fsSI -A 'electron-rare-gh-verify/1.0' https://www.lelectronrare.fr/preview/mentions-legales/
```

### B4 - Etat courant
- white-contrast preview valide: `23094884980`
- top bar mobile preview validee publiquement: `23095540371`

## Sprint C - Production

### C1 - Preconditions
- preview valide visuellement
- build propre
- pas de regression tracking evidente
- validation humaine du header mobile

### C2 - Deploy production
- workflow GitHub Actions: `deploy-ovh-ftp.yml`
- target: `production`
- remote attendu: `/www`
- verification publique automatique post-deploy via `scripts/verify-public-target.mjs`

### C3 - Verification production
```bash
curl -fsSI -A 'electron-rare-gh-verify/1.0' https://www.lelectronrare.fr/
curl -fsSI -A 'electron-rare-gh-verify/1.0' https://www.lelectronrare.fr/formation/
curl -fsSI -A 'electron-rare-gh-verify/1.0' https://www.lelectronrare.fr/mentions-legales/
curl -fsSI -A 'electron-rare-gh-verify/1.0' https://www.lelectronrare.fr/robots.txt
curl -fsSI -A 'electron-rare-gh-verify/1.0' https://www.lelectronrare.fr/sitemap.xml
```

### C4 - Etat courant
- production republiee avec le lot `Modernize Electron Rare mobile header`: `23096174775`
- verification publique du workflow: OK
- verification locale `curl` avec `User-Agent` workflow: `200` sur `www`, `formation`, `mentions-legales`
- controle navigateur humain encore requis pour la validation UX finale

## Sprint D - Tracking / SEO

### D1 - Events a verifier
- `cta_hero_contact`
- `outbound_linkedin_contact`
- `outbound_email_contact`
- `outbound_github_contact`
- `cta_lab_interactif_open`
- `experiment_variant_exposed`
- `engagement_scroll_depth`
- `engagement_section_view`
- `cwv_metric`

### D2 - Pages/meta a verifier
- canonical
- robots
- sitemap
- OG/Twitter
- `theme-color`

## Definition de done
- preview publie et valide
- prod publiee et validee
- theme blanc contraste par defaut confirme en live
- docs alignees sur Astro/OVH actuel
