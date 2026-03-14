# Audit approfondi — Webdesign, conversion, SEO, performance, accessibilité

> Statut 2026-03-14: document historique.
> Le contexte de production a change depuis sa redaction: Astro + OVH FTP, plus de lab public, nouveau positionnement.
> Remplacements: `docs/README.md`, `docs/project-master-todos.md`, `docs/acquisition-seo-plan.md`.

Date: 2026-03-02
Repo: electron-rare.github.io
Périmètre: home Astro (`src/**`), publication statique (`dist/`), tracking, SEO, préflight CI local.

## Méthode
- Audit local: structure HTML/sections, CTA/tracking, assets, build, typecheck, preflight.
- Vérifications exécutées:
  - `npm run build` ✅
  - `npm run preflight:pages` ✅
  - `npm run tracking:check` ✅
  - `npm run typecheck` ❌ (2 erreurs hors scope produit)
- Veille web officielle (W3C/Google/MDN/Astro/web.dev) pour aligner les recommandations.

## Findings (ordre de sévérité)

### P0 — Performance LCP/poids média très élevé en hero
- Observation:
  - Le hero charge des PNG lourds (2.3–3.1 MB chacun), dont 2 en `loading="eager"`.
  - Références: `src/components/sections/Hero.tsx:113`, `src/components/sections/Hero.tsx:128`.
  - `dist/` contient de nombreux assets >2 MB (jusqu’à 3.3 MB) dans `dist/assets/da/openai/*`.
- Impact:
  - Risque fort de LCP dégradé sur mobile/4G, donc baisse conversion et SEO (CWV).
- Action recommandée:
  - Convertir les hero assets en AVIF/WebP + variantes responsive.
  - Ne garder qu’une image prioritaire en eager (LCP candidate), les autres en lazy.
  - Migrer vers `astro:assets` (`<Image />`/`<Picture />`) pour optimisation automatique.

### P1 — Canonical/SEO potentiellement faux en double-hébergement
- Observation:
  - `SITE_URL` fallback sur GitHub Pages si `PUBLIC_SITE_URL` absent.
  - Référence: `src/lib/site.ts:3`.
  - `public/sitemap.xml` et `public/robots.txt` pointent actuellement sur `https://electron-rare.github.io/`.
- Impact:
  - En version externe, risque de canonical/sitemap incohérents, duplication d’indexation et dilution SEO.
- Action recommandée:
  - Rendre `PUBLIC_SITE_URL` obligatoire en build externe.
  - Générer robots/sitemap par environnement (Pages vs domaine externe).

### P1 — Qualité CI typecheck fragile (fichiers temporaires non exclus)
- Observation:
  - `npm run typecheck` échoue à cause de `tmp/figma-capture.spec.ts` et dépendances Playwright non installées.
  - Référence: `tmp/figma-capture.spec.ts:1`.
- Impact:
  - Dette qualité; risque d’échec CI future si typecheck devient gate bloquant.
- Action recommandée:
  - Exclure `tmp/**` du `tsconfig` de check ou déplacer ces scripts hors zone scannée.

### P1 — Rigidité des images par défaut (format PNG partout)
- Observation:
  - Pipeline assets majoritairement PNG lourds, pas de déclinaison format moderne.
- Impact:
  - Surconsommation bande passante, Time to Interactive plus lent, coût perf récurrent.
- Action recommandée:
  - Standardiser une policy médias: AVIF/WebP + fallback, dimensions max par zone, compression quality budget.

### P2 — Données structurées limitées
- Observation:
  - JSON-LD `Person` présent, mais pas de `WebSite`/`Organization` enrichi.
- Impact:
  - Moins de signal sémantique pour moteurs.
- Action recommandée:
  - Ajouter schémas complémentaires minimalistes (sans sur-spam).

### P2 — Préflight Storybook avec warnings de chunks lourds
- Observation:
  - Build Storybook signale plusieurs chunks > 500 KB.
- Impact:
  - Faible impact prod (storybook est outil interne), mais affecte vitesse de review design.
- Action recommandée:
  - Découpage plus fin des stories lourdes si besoin équipe.

## Forces actuelles (à préserver)
- Contrat tracking solide avec validation dédiée (`tracking:check`) ✅.
- CTA et parcours conversion lisibles, états focus et interactions présents ✅.
- Build et preflight global passent ✅.
- Structure sémantique globale propre (`h1` unique, sections nommées, ancres clés stables) ✅.

## Plan d’amélioration recommandé

### Sprint A (48h) — Gains rapides ROI élevé
1. Optimiser hero assets (AVIF/WebP + responsive sizes).
2. Garder 1 seul visuel hero en eager (LCP), passer le reste en lazy.
3. Verrouiller `PUBLIC_SITE_URL` en externe pour canonical/sitemap.

### Sprint B (1 semaine) — Fiabilité & SEO
1. Corriger `typecheck` en excluant `tmp/**` du scan.
2. Ajouter `WebSite` + `Organization` JSON-LD.
3. Ajouter un contrôle budget média dans CI (taille max image hero).

### Sprint C (2 semaines) — Maturité continue
1. Mettre en place une mesure CWV réelle (CrUX/RUM si possible).
2. Définir KPI business: CTA CTR, conversion contact, scroll depth, outbound qualification.
3. Itérer A/B sur microcopy hero/CTA.

## Montée en compétences (compétences à renforcer)

### Priorité 1 — Performance web réelle
- Apprendre et appliquer LCP/INP/CLS orientés business.
- Exercice concret: passer le hero sous budget poids mobile.

### Priorité 2 — SEO technique de déploiement multi-domaines
- Maîtriser canonical/sitemap/robots par environnement.
- Exercice concret: pipeline build multi-host sans duplication SEO.

### Priorité 3 — Accessibilité opérationnelle
- Consolider WCAG 2.2 (focus, contrastes, navigation clavier, noms accessibles).
- Exercice concret: checklist A11y systématique avant release.

## Sources web officielles utilisées
- Web Vitals (Google): https://web.dev/articles/vitals
- Optimiser le LCP (web.dev): https://web.dev/articles/optimize-lcp
- SEO Starter Guide (Google): https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Lighthouse docs (Chrome): https://developer.chrome.com/docs/lighthouse
- WCAG 2.2 (W3C): https://www.w3.org/TR/WCAG22/
- Astro image optimization (`astro:assets`): https://docs.astro.build/en/guides/images/
- MDN responsive images (`srcset/sizes`): https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- HubSpot Academy (digital marketing): https://academy.hubspot.com/courses/digital-marketing
- Ahrefs Academy: https://ahrefs.com/academy
- Google Skillshop: https://skillshop.withgoogle.com/
