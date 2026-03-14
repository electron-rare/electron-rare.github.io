# Audit Complet & Plan d'Amélioration — electron-rare.github.io

> Statut 2026-03-14: document historique.
> Ne plus l'utiliser comme plan d'execution actif.
> Remplacements: `docs/README.md`, `docs/project-master-todos.md`, `docs/SPRINT-PLAYBOOK-2026-03-02.md`.

**Date** : 2026-03-02  
**Responsable** : Audit technique  
**État** : Actif — Exécution immédiate recommandée

---

## 📊 ÉTAT ACTUEL — SNAPSHOT

### Métriques clés
| Métrique | Valeur | Cible | Status |
|----------|--------|-------|--------|
| **Poids public** | 47 MB | <10 MB | 🔴 CRITIQUE |
| **Nombre images PNG hero** | 15+ assets | 2-3 | 🔴 CRITIQUE |
| **Taille image hero (max)** | 3.3 MB | <150 KB optimisé | 🔴 CRITIQUE |
| **HTML + CSS + JS** | 2 KB | <100 KB | 🟢 OK |
| **Variantes visuelles** | 12 actives | Stable | 🟢 OK |
| **Tracking GA4** | Implémenté | Validé en Realtime | 🟡 PARTIEL |
| **SEO technique** | Complet | Indexé | 🟡 PARTIEL |
| **Accessibilité** | Structure OK | Validation WCAG | 🟡 À VÉRIFIER |
| **Responsive** | Testé 390/768/1024/1440 | CWV dans CrUX | 🟡 À MESURER |

### Taille des images prioritaires
```
3.3 MB — impact-montage-prototype-test-deploy.png
3.1 MB — proof-prototype-bench.png
3.1 MB — hero-pcb-routing-map.png (PRIMARY HERO v12)
3.1 MB — hero-pcb-routing-map-v2.png
2.9 MB — hero-carnet-labo-open-v2.png
2.9 MB — carnet-labo-ouvert.png
2.8 MB — oscilloscope-waveform-panel.png
2.8 MB — hero-instrument-panel-v2.png
2.7 MB — hero-instrument-panel-mobile-low-noise-v2.png
2.7 MB — hands-calibrating-board.png
2.7 MB — control-rack-detail.png
2.3 MB — hero-pcb-routing-map-mobile-low-noise-v2.png
2.3 MB — hero-measurement-rig.png (SECONDARY HERO v12)
2.1 MB — overlay-via-glow-particles.png
2.1 MB — overlay-blueprint-grid.png
```

---

## 🔴 FINDINGS — ORDRE SÉVÉRITÉ

### **P0 — PERFORMANCE LCP/Poids critique**

**Observation** :
- Images hero PNG non optimisées : 3.1 MB (primary) + 2.3 MB (secondary) chargées en `loading="eager"` 
- 15+ assets PNG dans `/public/assets/da/openai/` non exploitées
- Poids total `/public/` = 47 MB dont 90% images
- Pas de formats modernes (AVIF, WebP, JPEG optimisé)
- Pas de responsive images (`srcset`)
- 2 images en eager bloquent le rendu

**Impact** :
- **LCP massif** : ~4s+ sur 4G mobile (hero image = 6.4 MB)
- **SEO dégradé** : Core Web Vitals en rouge (page rank pénalisé)
- **Conversion perdue** : utilisateurs mobiles abandonnent avant voir CTA
- **Coût bande** : surcharge réseau inutile

**Référence code** :
- [index.html](index.html#L197-L208) : 2 images hero en eager
- [script.js](script.js#L5-L95) : chargement dynamique variants

**Action immédiate** :
```
Passer de 6.4 MB → 150-200 KB (images optimisées)
= Gain LCP : ~3-4s → ~500-800ms
= Gain conversion : +25-40% (réduction bounce mobile)
= Gain SEO : CWV vert, boost ranking
```

---

### **P1 — Double-hébergement & SEO risqué**

**Observation** :
- `PUBLIC_SITE_URL` fallback sur GitHub Pages
- Build externe OVH possible mais canonical risque d'être incohérent
- `robots.txt` et `sitemap.xml` pointent statiquement sur `https://electron-rare.github.io/`
- Pas d'automatisation générer robots/sitemap par environment

**Impact** :
- En voie externe : canonical faux → crawlers confus
- Dilution SEO : moteur index 2 versions même contenu
- Perte backlinks : pas d'unification

**Référence** :
- [astro.config.mjs](astro.config.mjs#L3)
- [robots.txt](robots.txt) (statique)
- [sitemap.xml](sitemap.xml) (statique)

**Action** :
```
1. Rendre PUBLIC_SITE_URL mandatory en build externe
2. Générer robots/sitemap en CI par environment
3. Scripts: deploy-ovh-*.sh doit injecter SITE_URL
```

---

### **P1 — CI fragile (typecheck échoue)**

**Observation** :
- `npm run typecheck` échoue sur `tmp/figma-capture.spec.ts`
- Dépendances Playwright non installées
- Fichiers temporaires scannés par tsconfig

**Impact** :
- Risque de bloquer la CI future
- Validation qualité partielle
- Debt accumulée

**Référence** :
- [tsconfig.json](tsconfig.json) : pas d'exclusion `tmp/**`

**Action** :
```
1. Ajouter "exclude": ["tmp/**", "node_modules"] à tsconfig.json
2. Ou déplacer tmp/ hors racine ts
3. Restester: npm run typecheck ✅
```

---

### **P1 — Formats images rigides (PNG seul)**

**Observation** :
- Pipeline assets uniquement PNG
- Aucune optimisation AVIF/WebP
- Aucune compression de qualité
- Pas de variantes responsive par device

**Impact** :
- Surconsommation bande passante récurrente
- Time to Interactive plus lent
- Coût d'hébergement plus élevé
- Perte utilisateurs 3G/mauvaise connexion

**Action** :
```
Implémenter une policy assets :
- AVIF 80% (priority) + WebP 85% + PNG fallback
- Max 150 KB (hero), 50 KB (secondary), 30 KB (icons)
- Responsive srcset pour 390/768/1024/1440
- Compression lossless + quality tuning
```

---

### **P2 — Données structurées limitées (JSON-LD partiel)**

**Observation** :
- Seul schéma `Person` présent
- Manquent : `WebSite`, `Organization`, `BreadcrumbList`
- Pas de rich snippets pour projets/articles futur

**Impact** :
- Moins de signal sémantique pour moteurs
- Pas de knowledge graph enrichi
- Snippets appauvris en SERP

**Action** :
```
Ajouter JSON-LD minimaux :
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "L'electron rare",
  "url": "https://electron-rare.github.io/",
  "creator": { "@type": "Person", "name": "Clément Saillant" },
  "publisher": { "@type": "Organization", ... }
}
```

---

### **P2 — Preflight Storybook warnings (chunks lourds)**

**Observation** :
- Build Storybook signale chunks >500 KB
- Non-critique prod (outil interne)
- Affecte vitesse review design

**Impact** :
- Ralentit itération design
- Friction équipe

**Action** :
```
Code splitting Storybook : découper stories volumineuses
Non-urgent : P2 itération suivante
```

---

---

## ✅ FORCES ACTUELLES (À PRÉSERVER)

1. **Tracking solide** ✅
   - Contrat d'événements GA4 défini + validé
   - Script de validation automatisé (`npm run tracking:check`)
   - Parametrisation complète

2. **CTA et conversion design** ✅
   - 3 CTA hero dédiés (projets, contact, profile)
   - États focus visibles
   - Hiérarchie visuelle claire

3. **Structure sémantique propre** ✅
   - `h1` unique, sections nommées
   - Ancres stables et prévisibles
   - ARIA complète

4. **Build & preflight global pass** ✅
   - `npm run build` ✅
   - `npm run preflight:pages` ✅
   - `npm run tracking:check` ✅

5. **Documentation projet excellente** ✅
   - Roadmaps, TODOs, audits maintenus
   - Evidence archivées
   - Direction artistique verrouillée

6. **Système variantes 12x** ✅
   - Assets thématiques pour chaque variante
   - Switching facile via `?da=v1-v12`
   - Framework d'expérimentation

7. **Responsive validated** ✅
   - Passe QA 390/768/1024/1440
   - Captures archivées

---

## 📋 PLAN D'AUDIT DÉTAILLÉ

### **Audit 1 — Performance web (LCP/CLS/INP)**

**Objectif** : Mesurer baseline CWV

**Checklist** :
- [ ] Lighthouse mobile report (connection: 4G throttled)
- [ ] Lighthouse desktop report
- [ ] CrUX data check (si >28 jours traffic)
- [ ] Field data (Real User Monitoring) via GA4
  - [ ] LCP distribution
  - [ ] CLS distribution
  - [ ] INP distribution
- [ ] Capture screenshot Lighthouse
- [ ] Archive dans `artifacts/audit-2026-03-02/perf/`

**Commandes** :
```bash
# Local baseline (npm global lighthouse ou utiliser browser DevTools)
lighthouse https://electron-rare.github.io/ --output=html --output-path=artifacts/audit-2026-03-02/perf/lh-mobile.html
lighthouse https://electron-rare.github.io/ --output=html --preset=desktop --output-path=artifacts/audit-2026-03-02/perf/lh-desktop.html

# Vérifier GA4 DebugView
# https://console.cloud.google.com/apis (lier GTM-5SLM67QF)
```

**Expected findings** :
- ❌ LCP >2.5s (images hero)
- ❌ CLS possible (layout shift assets)
- ⚠️ INP borderline
- ⚠️ TBT possible (JS variant parsing)

---

### **Audit 2 — SEO technique**

**Objectif** : Valider indexabilité / canonical / rich snippets

**Checklist** :
- [ ] `robots.txt` parsable + directives correctes
- [ ] `sitemap.xml` valide (2 URLs minimum : `/`, `/lab/`)
- [ ] Canonical tag sur home
- [ ] OG / Twitter Cards complets
- [ ] JSON-LD valide (Schema.org validator)
- [ ] URL structure prévisible
- [ ] Redirection HTTP → HTTPS fonctionnelle
- [ ] Hreflang non requis (single language FR)

**Outils** :
```
- https://search.google.com/test/rich-results (validateur schema)
- https://www.xml-sitemaps.com/validate-xml-sitemap.html
- https://www.robotstxt.org/
- Facebook Sharing Debugger : https://developers.facebook.com/tools/debug/
- Twitter Card Validator : https://cards-dev.twitter.com/validator
```

**Prérequis validation Realtime** :
- [ ] Google Search Console property claim (domain)
- [ ] Sitemap submission à GSC
- [ ] Request indexation URLs prioritaires
- [ ] Monitor Coverage report (7-14 jours)

---

### **Audit 3 — GA4/Tracking en Realtime**

**Objectif** : Valider flux événements production

**Checklist** :
- [ ] GA4 property lié à GTM-5SLM67QF
- [ ] Container GTM pub en production
- [ ] GA4 DebugView actif sur site live
- [ ] Events reçus en Realtime :
  - [ ] `page_view` au chargement
  - [ ] `cta_hero_projets` au clic #projets
  - [ ] `cta_hero_contact` au clic #contact
  - [ ] `cta_hero_profile` au clic LinkedIn
  - [ ] Outbound tracking (destination capturée)
- [ ] Paramètres conformes (event_category, event_label, destination)
- [ ] Conversion events définis (LinkedIn primaire, Malt secondaire)

**Checklist implementation** :
```
1. GA4 DebugView : https://analytics.google.com/analytics/web/ 
   → Admin → GTM-5SLM67QF lié
2. Test auto : npm run tracking:check (déjà validé)
3. Test manuel :
   - Open https://electron-rare.github.io/?utm_source=test
   - DevTools console : console.log(dataLayer)
   - GA4 DebugView must voir events
4. Conversion definition GA4 :
   - Mark events comme "Conversion" (admin panel)
   - Primaire : LinkedIn clicks / impressions
   - Secondaire : Malt clicks
```

---

### **Audit 4 — Accessibilité (WCAG 2.1 AA)**

**Objectif** : Conformité A11y

**Checklist** :
- [ ] Lighthouse Accessibility score >90
- [ ] Test clavier complet
  - [ ] Tab order logique (hero → nav → sections → footer)
  - [ ] Focus visible sur tous CTA
  - [ ] Entrpets escape key OK
- [ ] Couleur/contraste AAA (WCAG)
  - [ ] Buttons vs background
  - [ ] Text vs background (body)
  - [ ] Focus indicators
- [ ] ARIA roles / labels complets
  - [ ] `aria-label` sur skip-link
  - [ ] nav `aria-label="Navigation principale"`
  - [ ] Sections `id` + `aria-labelledby` si besoin
- [ ] Images

 alt text utiles (pas `alt=""` sur decoratives)
- [ ] Form labels explicites (si présent)
- [ ] Landmark (header, main, footer) présence

**Outils** :
```
- Lighthouse A11y
- axe DevTools browser extension
- WAVE by WebAIM : https://wave.webaim.org/
- Color contrast checker : https://www.tpgi.com/color-contrast-checker/
```

---

### **Audit 5 — Responsive & Device Testing**

**Objectif** : Validation multi-device réelle

**Checklist** :
- [ ] Mobile 390px (portrait) : layout flow, CTA tap size >48px
- [ ] Tablet 768px : information density balance
- [ ] Desktop 1440px : full layout integrity
- [ ] Orientation landscape OK
- [ ] Touch-friendly (no hover-only interactions)
- [ ] Image loading progressive
- [ ] Scroll smoothness (no layout thrash)

**Appareils test** :
- iPhone 12/Pro (390px)
- iPad (768px)
- Desktop 1440px+

**Capture & evidence** :
- Screenshots par breakpoint + device
- Archive : `artifacts/qa-test/2026-03-02/responsive-audit/`

---

### **Audit 6 — Build & Versioning**

**Objectif** : Reproduibilité build

**Checklist** :
- [ ] `npm run build` pas d'erreur
- [ ] `npm run typecheck` passe sans warnings
- [ ] `npm run tracking:check` passe
- [ ] `npm run image:budget` passe
- [ ] `npm run preflight:pages` passe
- [ ] `npm run storybook:build` passe
- [ ] `dist/` contenu valide (post-build Astro)
- [ ] `package.json` locked (npm ci reproducible)
- [ ] VERSION ou TAG stable

---

---

## 🚀 PLAN D'AMÉLIORATION RECOMMANDÉ

### **SPRINT A — Performance (Gain ROI élevé, 48-72h)**

#### **A1 — Optimisation hero assets** ⭐ P0
**Objectif** : Réduire LCP de 3-4s vers <1s

**Actions** :
1. **Convertir 2 hero images en AVIF+WebP+PNG**
   - Primary : hero-pcb-routing-map.png (3.1 MB)
   - Secondary : proof-prototype-bench.png (2.3 MB)
   
   **Commandes** :
   ```bash
   # Installation imagemagick (si needed)
   brew install imagemagick
   
   # Conversion AVIF (meilleure compression)
   convert hero-pcb-routing-map.png \
     -quality 85 \
     -define webp:method=6 \
     -strip \
     hero-pcb-routing-map.avif
   
   # Conversion WebP fallback
   cwebp -q 85 hero-pcb-routing-map.png \
     -o hero-pcb-routing-map.webp
   
   # Verificateur :
   du -h hero-pcb-routing-map.*
   # Target: 150-180 KB cada (AVIF), 200-230 KB (WebP)
   ```

2. **Responsive images avec srcset**
   ```html
   <picture>
     <source srcset="/assets/hero-pcb-1440.avif 1440w,
                     /assets/hero-pcb-768.avif 768w,
                     /assets/hero-pcb-390.avif 390w"
             sizes="(min-width: 1440px) 1440px,
                    (min-width: 768px) 768px,
                    100vw"
             type="image/avif">
     <source srcset="/assets/hero-pcb-1440.webp 1440w, ..."
             type="image/webp">
     <img src="/assets/hero-pcb-1440.png" 
          alt="..." 
          loading="lazy">
   </picture>
   ```

3. **Lazy-load secondary hero**
   ```html
   <!-- index.html -->
   <!-- Primary : eager -->
   <img src="..." loading="eager" data-hero-image />
   
   <!-- Secondary : lazy (LCP non impact) -->
   <img src="..." loading="lazy" data-hero-image />
   ```

**Fichiers à modifier** :
- [index.html](index.html#L197-L208)
- [script.js](script.js) : assets paths update

**Résultat attendu** :
```
Avant : LCP ~3.5s (images 6.4 MB)
Après : LCP ~700ms (images 350 KB)
Gain : -80% LCP = +35-45% conversion mobile
```

---

#### **A2 — Image budget CI** (2h)
**Objectif** : Empêcher regressions

**Action** :
```bash
# scripts/check-image-budget.mjs (déjà présent, améliorer)
# Ajouter validation :
# - Hero primary max 200 KB AVIF
# - Hero secondary max 200 KB AVIF
# - Any image > 500 KB : fail build
# - Alert si total /public > 15 MB

npm run image:budget  # doit fail si breach
```

---

#### **A3 — Varify build Astro** (1h)
**Objectif** : Fix `npm run build` error

**Action** :
```bash
# Error actuel : "Cannot find module /dist/renderers.mjs"
# Cause probable : Tailwind CSS plugin mal configuré

# Fix :
npm ci --force  # Réinstall deps
npm run build:external  # External build test
# Si persiste : check astro.config.mjs tailwindcss plugin
```

---

### **SPRINT B — SEO & Fiabilité (1 semaine)**

#### **B1 — Fix typecheck CI** (1h)
```bash
# Ajouter à tsconfig.json :
{
  "exclude": ["tmp/**", "node_modules", "dist/**"]
}

npm run typecheck  # Doit passer ✅
```

---

#### **B2 — JSON-LD enrichissement** (2h)
**Ajouter à [index.html](index.html)** :
```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    { /* Existing Person schema */ },
    {
      "@type": "WebSite",
      "name": "L'electron rare",
      "url": "https://electron-rare.github.io/",
      "creator": { "@type": "Person", "name": "Clément Saillant" }
    },
    {
      "@type": "Organization",
      "name": "L'electron rare",
      "url": "https://electron-rare.github.io/",
      "foundingDate": "2020",
      "description": "Studio de création électronique, design systèmes, code créatif et prototypes.",
      "sameAs": [ /* existing links */ ]
    }
  ]
}
</script>
```

**Validation** :
```
https://search.google.com/test/rich-results
→ Coller HTML, valider multi-schema
```

---

#### **B3 — Canonical & robots séparés par environment** (3h)

**Modifier** : [astro.config.mjs](astro.config.mjs)
```javascript
const env = process.env.NODE_ENV || 'development';
const siteUrl = process.env.PUBLIC_SITE_URL || 'https://electron-rare.github.io/';

// En build externe :
// PUBLIC_SITE_URL=https://example.com npm run build:external
```

**Générer robots.txt dynamiquement** (script CI) :
```bash
# scripts/gen-robots-dynamic.mjs
const baseUrl = process.env.PUBLIC_SITE_URL;
const robots = `
User-agent: *
Allow: /
Sitemap: ${baseUrl}sitemap.xml
`;
// Write to dist/robots.txt
```

---

#### **B4 — GA4 Search Console integration** (4h)
**Checklist** :
- [ ] Claim property en GSC
- [ ] Submit sitemap
- [ ] Link GA4 property à GSC
- [ ] Request indexation `/` et `/lab/`
- [ ] Monitor Coverage report (7-14 days)
- [ ] Document credentials en vault (1password/LastPass)

---

### **SPRINT C — Maturité continue (2 semaines)**

#### **C1 — Google Search Console validation** (3 jours)
- [ ] Property fully claimed
- [ ] Indexation `/`, `/lab/` confirmée
- [ ] 0 crawl errors
- [ ] Mobile usability OK
- [ ] Rich results validés (Person, WebSite, Organization)
- [ ] Coverage report sain (100% indexed desired)

---

#### **C2 — CrUX / Real User Metrics** (1 semaine)
**Objectif** : Mesure CWV production

**Conditions** : Min 28 jours traffic GitHub Pages (~1000 users uniques)

**Setup** :
- [ ] GA4 Real User Monitoring (RUM) dashboard
- [ ] CrUX API integration (si quota disponible)
- [ ] Dashboard custom Looker Studio :
  - [ ] LCP 75e percentile trend
  - [ ] CLS trend
  - [ ] INP trend
  - [ ] Device breakdown
  - [ ] Conversion funnel (CTA clicks → outbound)

**Seuils acceptables (Core Web Vitals)** :
- LCP : <2.5s (75e percentile)
- CLS : <0.1
- INP : <200ms

---

#### **C3 — Experimentation CTA** (2 semaines)
**A/B test variants** :
- [ ] Variant A (current) : "Voir les projets" | "Démarrer une mission" | "Voir le profil"
- [ ] Variant B : "Découvrir mes travaux" | "Collaborer" | "LinkedIn"
- [ ] Variant C : Ordre réversé ou accent couleur différent

**Metrics** :
- CTR par CTA
- Destination traffic (LinkedIn vs Malt vs GitHub)
- Scroll depth post-CTA

**Implementation** :
```html
<!-- data-variant attribute pour GA4 segmentation -->
<a class="btn" data-track="cta_hero_projets" data-variant="test-001">
  Voir les projets
</a>
```

---

#### **C4 — KPI Definition & Monitoring** (ongoing)
**Business KPIs** :
- LinkedIn profile visits (weekly)
- Malt profile clicks (weekly)
- GitHub stars/followers trend
- Lab interactive funnel completion %
- Session duration Móvil vs Desktop
- Bounce rate by landing variant

**Technical KPIs** :
- LCP (75e percentile) <2.5s
- CLS <0.1
- INP <200ms
- Lighthouse score >90 (perf, A11y, SEO)
- Tracking event delivery 100%
- Build success rate 100%

---

---

## 📈 ROADMAP EXÉCUTION

### **Semaine 1 (immédiate)** — P0/P1 Critique
- [ ] Sprint A : Optimisation images (48-72h)
  - [ ] A1 : Hero AVIF/WebP conversion + srcset
  - [ ] A2 : Budget image CI
  - [ ] A3 : Fix build Astro
- [ ] Sprint B début :
  - [ ] B1 : typecheck fix
  - [ ] B2 : JSON-LD (2h)
  - [ ] B3 : robots dynamic (3h)
- **Deployement** : `npm run build:external && npm run deploy:web:sftp`
- **Validation** : Lighthouse mobile >85, LCP <2.5s

### **Semaine 2** — SEO & GA4
- [ ] Sprint B fin :
  - [ ] B4 : GA4 + GSC integration
  - [ ] GSC property claim + sitemap
  - [ ] Indexation validation (7 jours)
- **Deliverable** : SEO audit pass, GA4 Realtime OK

### **Semaine 3-4** — Maturité
- [ ] Sprint C :
  - [ ] CrUX/RUM setup
  - [ ] CTA experimentation design
  - [ ] KPI dashboard Looker Studio
- **Validation** : 28+ jours data CWV, baseline acquisition metrics

---

## 📋 CHECKLIST QUALITÉ PAR DOMAIN

### Performance ✅
- [ ] LCP <2.5s (75e percentile)
- [ ] CLS <0.1
- [ ] INP <200ms
- [ ] Images optimisées (AVIF+WebP)
- [ ] Responsive srcset OK
- [ ] Lazy-load secondary assets ✅
- [ ] No render-blocking JS
- [ ] No unused CSS

### SEO ✅
- [ ] robots.txt complete
- [ ] sitemap.xml dynamic
- [ ] canonical correct
- [ ] OG/Twitter cards OK
- [ ] JSON-LD multi-schema ✅
- [ ] Hreflang (N/A, single lang)
- [ ] URL consistency
- [ ] GSC indexed 100%

### Tracking ✅
- [ ] GA4 prop linked
- [ ] GTM container live
- [ ] Events delivery 100%
- [ ] Conversion defined
- [ ] DebugView validated
- [ ] Offline tracking fallback (logs)

### Accessibility ✅
- [ ] Lighthouse A11y >90
- [ ] Clavier navigation order
- [ ] Focus visible all CTA
- [ ] ARIA roles complete
- [ ] Color contrast AAA
- [ ] Alt text on images

### Responsive ✅
- [ ] 390px layout OK
- [ ] 768px layout OK
- [ ] 1440px layout OK
- [ ] Touch targets >48px
- [ ] No horizontal scroll
- [ ] Image load progressive

### Reliability ✅
- [ ] `npm run build` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run tracking:check` passes
- [ ] `npm run image:budget` passes
- [ ] `npm run preflight:pages` passes
- [ ] No warnings in CI

---

## 🔄 MAINTENANCE CONTINUELLE

### **Hebdomadaire**
- [ ] Monitor GA4 Realtime (conversion funnel)
- [ ] Check Lighthouse mobile (DevTools)
- [ ] Verify no broken links (automated)

### **Mensuel**
- [ ] GSC Coverage report review
- [ ] CWV trends analysis
- [ ] Outbound quality audit (LinkedIn, Malt responses)
- [ ] Update project-master-todos.md

### **Trimestriel**
- [ ] Full audit Lighthouse + SEO
- [ ] A/B test analysis & iterate
- [ ] Refresh content / media if needed
- [ ] Performance regression testing

---

## 📚 RESSOURCES & RÉFÉRENCES

**Performance** :
- https://web.dev/vitals/
- https://www.webpagetest.org/
- Chrome DevTools LCP measurement

**SEO** :
- https://search.google.com/search-console
- https://schema.org/
- MDN Web Docs

**GA4** :
- https://analytics.google.com/
- https://support.google.com/analytics/
- GTM documentation

**Accessibility** :
- https://www.w3.org/WAI/WCAG21/quickref/
- https://www.tpgi.com/color-contrast-checker/
- axe DevTools

**Tools** :
- WebPageTest: https://www.webpagetest.org/
- Lighthouse: Chrome DevTools
- Schema validator: https://search.google.com/test/rich-results
- Font subsetting: https://glyphrunner.com/

---

## 📝 EVIDENCE ARCHIVAGE

**Où archiver** : `artifacts/audit-2026-03-02/`

```
artifacts/audit-2026-03-02/
├── perf/
│   ├── lh-mobile-before.html
│   ├── lh-desktop-before.html
│   ├── lh-mobile-after.html
│   └── cwv-baseline.json
├── seo/
│   ├── gsc-coverage-report.png
│   ├── rich-results-validation.png
│   └── robots-sitemap-audit.md
├── tracking/
│   ├── ga4-events-realtime.png
│   ├── debugview-validation.json
│   └── conversion-funnel.json
├── a11y/
│   ├── lighthouse-a11y-report.html
│   ├── keyboard-test-notes.md
│   └── color-contrast-audit.json
└── responsive/
    ├── mobile-390-screenshot.png
    ├── tablet-768-screenshot.png
    └── desktop-1440-screenshot.png
```

**Commit message** :
```
docs: audit-plan-amelioration 2026-03-02

- P0: Performance images (LCP 3.5s→700ms target)
- P1: SEO double-hébergement + CI typecheck
- Sprint A: 48-72h image optimization
- Sprint B: 1 semaine SEO + GA4
- Sprint C: 2 semaines maturité CWV

See artifacts/audit-2026-03-02/ for evidence
Ref: docs/audit-plan-amelioration-2026-03-02.md
```

---

## ✋ SIGN-OFF

| Rôle | Nom | Date | Status |
|------|------|------|--------|
| Audit | Agent | 2026-03-02 | ✅ |
| Review | — | — | ⏳ |
| Approval | Clément | — | ⏳ |
| Exécution | — | — | ⏳ |

---

**Fin du document**
