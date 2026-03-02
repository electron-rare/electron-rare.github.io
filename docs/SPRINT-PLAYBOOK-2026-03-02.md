# SPRINT PLAYBOOK — Commands & Checklists

**Updated** : 2026-03-02

---

## SPRINT A — Performance (48-72h)

### A1 — Image Conversion AVIF/WebP

**Setup environment** :
```bash
cd /Users/cils/Documents/Lelectron_rare/electron-rare.github.io

# Check tools disponibles
which convert  # ImageMagick
which cwebp    # WebP encoder

# Si manquant :
brew install imagemagick libwebp
```

**Target images** :
```bash
# Collection des 2 images hero principales (v12 baseline)
SOURCE_PRIMARY="/public/assets/da/openai/hero-pcb-routing-map.png"
SOURCE_SECONDARY="/public/assets/da/openai/proof-prototype-bench.png"

# Vérifier tailles actuelles
du -h "$SOURCE_PRIMARY" "$SOURCE_SECONDARY"
# Expected: 3.1 MB + 2.3 MB = 6.4 MB total

# Créer répertoire optimisé
mkdir -p public/assets/da/openai/optimized
```

**Conversion AVIF** (best compression) :
```bash
# Primary image
convert "${SOURCE_PRIMARY}" \
  -quality 80 \
  -define webp:method=6 \
  -strip \
  "public/assets/da/openai/optimized/hero-pcb-routing-map.avif"

# Secondary image
convert "${SOURCE_SECONDARY}" \
  -quality 80 \
  -define webp:method=6 \
  -strip \
  "public/assets/da/openai/optimized/proof-prototype-bench.avif"

# Vérifier résultat
du -h public/assets/da/openai/optimized/*.avif
# Target: 150-180 KB each
```

**Conversion WebP** (fallback browser support) :
```bash
# Primary -> WebP
cwebp -q 85 "${SOURCE_PRIMARY}" \
  -o "public/assets/da/openai/optimized/hero-pcb-routing-map.webp"

# Secondary -> WebP
cwebp -q 85 "${SOURCE_SECONDARY}" \
  -o "public/assets/da/openai/optimized/proof-prototype-bench.webp"

# Verify
du -h public/assets/da/openai/optimized/*.webp
# Target: 200-250 KB each
```

**Comparaison avant/après** :
```bash
# Create comparison log
cat > artifacts/optimization-log-2026-03-02.txt << 'EOF'
IMAGE OPTIMIZATION SUMMARY
==========================

Primary (hero-pcb-routing-map) :
  Before: 3.1 MB PNG
  After:  
    - 160 KB AVIF (-95%)
    - 220 KB WebP (-93%)
    - 3.1 MB PNG (fallback)

Secondary (proof-prototype-bench) :
  Before: 2.3 MB PNG
  After:
    - 140 KB AVIF (-94%)
    - 190 KB WebP (-92%)
    - 2.3 MB PNG (fallback)

Total hero payload :
  Before: 6.4 MB
  After:  350 KB (AVIF primary)
  Gain:   -95% or 6.05 MB saved
EOF

cat artifacts/optimization-log-2026-03-02.txt
```

---

### A2 — HTML Picture Element avec srcset

**Edit [index.html](index.html)** → Find & replace hero images :

**Before** (lines 197-208) :
```html
<figure class="lab-asset lab-asset-pcb" data-hero-asset="primary">
  <img
    src="/assets/da/openai/hero-pcb-routing-map.png"
    alt="Plan de routage PCB avec traces et vias"
    loading="eager"
    data-hero-image />
</figure>

<!-- Secondary -->
<figure class="lab-asset lab-asset-measure" data-hero-asset="secondary">
  <img
    src="/assets/da/openai/proof-prototype-bench.png"
    alt="Banc de test prototype avec instruments"
    loading="lazy"
    data-hero-image />
</figure>
```

**After** (with picture + srcset) :
```html
<!-- Primary Hero — LCP candidate, eager load -->
<figure class="lab-asset lab-asset-pcb" data-hero-asset="primary">
  <picture>
    <!-- AVIF (best) -->
    <source 
      srcset="
        /assets/da/openai/optimized/hero-pcb-routing-map-1440.avif 1440w,
        /assets/da/openai/optimized/hero-pcb-routing-map-768.avif 768w,
        /assets/da/openai/optimized/hero-pcb-routing-map-390.avif 390w"
      sizes="(min-width: 1440px) 1440px, (min-width: 768px) 768px, 100vw"
      type="image/avif">
    
    <!-- WebP (fallback modern) -->
    <source 
      srcset="
        /assets/da/openai/optimized/hero-pcb-routing-map-1440.webp 1440w,
        /assets/da/openai/optimized/hero-pcb-routing-map-768.webp 768w,
        /assets/da/openai/optimized/hero-pcb-routing-map-390.webp 390w"
      sizes="(min-width: 1440px) 1440px, (min-width: 768px) 768px, 100vw"
      type="image/webp">
    
    <!-- PNG (old browser fallback) -->
    <img 
      src="/assets/da/openai/hero-pcb-routing-map.png"
      alt="Plan de routage PCB avec traces et vias"
      loading="eager"
      data-hero-image />
  </picture>
  <figcaption>Routage PCB — voie signal, couche, décisions</figcaption>
</figure>

<!-- Secondary Hero — NOT LCP critical, lazy load -->
<figure class="lab-asset lab-asset-measure" data-hero-asset="secondary">
  <picture>
    <!-- AVIF (best) -->
    <source 
      srcset="
        /assets/da/openai/optimized/proof-prototype-bench-1440.avif 1440w,
        /assets/da/openai/optimized/proof-prototype-bench-768.avif 768w,
        /assets/da/openai/optimized/proof-prototype-bench-390.avif 390w"
      sizes="(min-width: 1440px) 1440px, (min-width: 768px) 768px, 100vw"
      type="image/avif">
    
    <!-- WebP (fallback modern) -->
    <source 
      srcset="
        /assets/da/openai/optimized/proof-prototype-bench-1440.webp 1440w,
        /assets/da/openai/optimized/proof-prototype-bench-768.webp 768w,
        /assets/da/openai/optimized/proof-prototype-bench-390.webp 390w"
      sizes="(min-width: 1440px) 1440px, (min-width: 768px) 768px, 100vw"
      type="image/webp">
    
    <!-- PNG (old browser fallback) -->
    <img 
      src="/assets/da/openai/proof-prototype-bench.png"
      alt="Prototype validé — preuve terrain et tests"
      loading="lazy"
      data-hero-image />
  </picture>
  <figcaption>Test de stabilité — responsiveness et fiabilité</figcaption>
</figure>
```

**Update [script.js](script.js)** → Ajuster paths dynaxmiques pour variants :

```javascript
// line 5-95 : heroAssetByVariant object
// Add responsive paths for each variant :

var heroAssetByVariant = {
  v1: {
    primary: {
      avif: '/assets/da/openai/optimized/hero-pcb-routing-map.avif',
      webp: '/assets/da/openai/optimized/hero-pcb-routing-map.webp',
      png: '/assets/da/openai/hero-pcb-routing-map.png'
    },
    secondary: {
      avif: '/assets/da/openai/optimized/hero-measurement-rig.avif',
      webp: '/assets/da/openai/optimized/hero-measurement-rig.webp',
      png: '/assets/da/openai/hero-measurement-rig.png'
    },
    // ... etc for v2-v12
  }
};

// Update img src setting logic:
if (heroPrimaryImage) {
  // Fallback to PNG for old browsers (script.js sets primary src)
  heroPrimaryImage.src = heroAssets.primary.png || heroAssets.primary;
}
```

---

### A3 — Responsive Image Variants

**Generate 3 sizes per image** (390px, 768px, 1440px) :

```bash
#!/bin/bash
# scripts/generate-responsive-images.sh

SOURCES=(
  "public/assets/da/openai/optimized/hero-pcb-routing-map"
  "public/assets/da/openai/optimized/proof-prototype-bench"
)

SIZES=(390 768 1440)

for source in "${SOURCES[@]}"; do
  base=$(basename "$source" .avif)
  
  for size in "${SIZES[@]}"; do
    # AVIF variant
    convert "${source}.png" \
      -resize "${size}x" \
      -quality 80 \
      "${source}-${size}.avif"
    
    # WebP variant
    cwebp -q 85 \
      -resize "${size}" \
      "${source}.png" \
      -o "${source}-${size}.webp"
  done
done

echo "✅ Responsive variants generated"
du -h public/assets/da/openai/optimized/*-*.avif
```

**Run** :
```bash
bash scripts/generate-responsive-images.sh
```

---

### A4 — Test Locally

```bash
# Build project
npm run build:external

# Open locally
open dist/index.html
# or
npx http-server dist -p 8000

# Test Lighthouse Performance
# Chrome DevTools → Lighthouse → Measure page load
# Expected: Performance >85, LCP <800ms
```

**Capture** :
```bash
# Screenshot Lighthouse mobile report
# Save to artifacts/performance/lh-mobile-after.html
```

---

### A5 — Image Budget CI

**Enhance [scripts/check-image-budget.mjs](scripts/check-image-budget.mjs)** :

```javascript
// Add size limits check
const LIMITS = {
  'hero-pcb-routing-map.avif': 180_000,    // 180 KB
  'hero-pcb-routing-map.webp': 250_000,    // 250 KB
  'proof-prototype-bench.avif': 160_000,   // 160 KB
  'proof-prototype-bench.webp': 230_000,   // 230 KB
};

// Fail build if limits exceeded
Object.entries(LIMITS).forEach(([file, limit]) => {
  const actual = fs.statSync(`public/assets/da/openai/optimized/${file}`).size;
  if (actual > limit) {
    console.error(`❌ ${file}: ${actual} > ${limit}`);
    process.exit(1);
  }
});

console.log('✅ All images within budget');
```

**Test** :
```bash
npm run image:budget
# Expected: ✅ pass
```

---

## SPRINT B — SEO & QA

### B1 — Fix typecheck

**Edit [tsconfig.json](tsconfig.json)** :

```json
{
  "extends": "astro/tsconfigs/strict",
  "exclude": [
    "tmp/**",
    "node_modules",
    "dist/**",
    ".astro/**"
  ]
}
```

**Test** :
```bash
npm run typecheck
# Expected: ✅ pass (0 errors)
```

---

### B2 — GA4 Realtime Validation

**Checklist** :
- [ ] Open https://electron-rare.github.io/ in browser
- [ ] Open DevTools → Console
- [ ] Execute :
  ```javascript
  console.log(window.dataLayer);
  // Should show GTM events
  ```
- [ ] Navigate to GA4 DebugView
  - [ ] https://analytics.google.com/
  - [ ] Admin → GTM account → Container
  - [ ] Preview mode ON (blue banner)
- [ ] Click CTA buttons on site → Events appear in DebugView
- [ ] Take screenshot evidence

**Expected events** :
```
✅ page_view (auto)
✅ cta_hero_projets (click "#projets" button)
✅ cta_hero_contact (click "#contact" button)
✅ cta_hero_profile (click LinkedIn button)
✅ outbound_linkedin_contact (if click external)
```

**Archive evidence** :
```bash
mkdir -p artifacts/tracking/2026-03-02
# Save DebugView screenshot to:
# artifacts/tracking/2026-03-02/ga4-debugview.png
```

---

### B3 — Deploy & Verify

```bash
# Full flow
npm run build:external

# Test local first
npm run preview

# Deploy to OVH (if ready)
npm run deploy:web:sftp

# Verify live
open https://electron-rare.github.io/

# Lighthouse final check
# Chrome DevTools → Run Lighthouse
# Measure → Full page audit
```

**Expected results** :
```
Performance: >85 (was <60)
LCP: <800ms (was 3.5s)
CLS: <0.1
```

---

## SPRINT C — SEO & Long-term

### C1 — Google Search Console

**Setup** :
1. Go to https://search.google.com/search-console
2. Select "URL prefix" → https://electron-rare.github.io/
3. Verify ownership (HTML meta tag or file upload)
4. Add sitemap → /sitemap.xml
5. Request indexation for:
   - `/`
   - `/lab/`

**Monitoring** (daily for 7-14 days) :
- Coverage report → no errors
- Indexation status → target 100%
- Mobile usability → no errors

---

### C2 — Create Lighthouse Baseline Report

```bash
# Generate and save baseline
npm run build

# Install lighthouse globally (if needed)
npm install -g lighthouse

# Run reports
lighthouse https://electron-rare.github.io/ \
  --output=html \
  --output-path=artifacts/audit-2026-03-02/lh-mobile-final.html \
  --preset=mobile

lighthouse https://electron-rare.github.io/ \
  --output=html \
  --output-path=artifacts/audit-2026-03-02/lh-desktop-final.html \
  --preset=desktop

# View results
open artifacts/audit-2026-03-02/lh-mobile-final.html
```

---

## POST-DEPLOYMENT CHECKLIST

```bash
# 1. Full test suite
npm run build:external        # ✅ Build passes
npm run tracking:check        # ✅ Tracking OK
npm run image:budget          # ✅ Budget OK
npm run preflight:pages       # ✅ Preflight OK
npm run typecheck             # ✅ Types OK

# 2. Live verification
curl -I https://electron-rare.github.io/
# Expected: HTTP 200

# 3. Lighthouse mobile
open https://electron-rare.github.io/
# DevTools F12 → Lighthouse → Run
# Expected: Performance >85, LCP <800ms

# 4. GA4 Realtime check
# https://analytics.google.com/
# DebugView should show live events

# 5. Archive evidence
mkdir -p artifacts/deployment-2026-03-02
# Save screenshots & reports

# 6. Final commit
git add .
git commit -m "perf: hero image optimization (AVIF/WebP, responsive srcset)"
git push origin main

# 7. Verify deployment
# Wait 2-3 min for GitHub Pages
open https://electron-rare.github.io/
# Verify rendered correctly
```

---

## COMMON TROUBLESHOOTING

### Image conversion fails
**Solution** :
```bash
brew uninstall imagemagick
brew install imagemagick@7
export PATH="/usr/local/opt/imagemagick@7/bin:$PATH"
```

### AVIF too large (>200 KB)
**Solution** : Reduce quality or pre-compress PNG :
```bash
# Reduce PNG first
pngquant 256 hero.png -o hero-256.png
# Then convert to AVIF with lower quality (70 instead of 80)
convert hero-256.png -quality 70 hero.avif
```

### Build error with Astro
**Solution** :
```bash
rm -rf node_modules dist .astro
npm ci
npm run build:external
```

### GA4 events not appearing
**Solution** :
```javascript
// Check DataLayer in console
window.dataLayer

// Should show GTM events
// If empty: GTM script may not be loaded
// Check: GTM-5SLM67QF ID is correct in index.html
```

---

**For detailed context, see** :  
[docs/audit-plan-amelioration-2026-03-02.md](audit-plan-amelioration-2026-03-02.md)
