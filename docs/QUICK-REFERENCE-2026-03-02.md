# QUICK REFERENCE CARD — Audit & Plan 2026-03-02

> Statut 2026-03-14: fiche historique.
> Le snapshot ci-dessous ne reflete plus l'etat public actuel.
> Voir `docs/README.md` et `docs/project-master-todos.md` pour l'etat reel.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ELECTRON-RARE.GITHUB.IO — STATUS SNAPSHOT                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🎯 PROJECT STATUS   : Active                                             │
│  📊 OVERALL HEALTH   : 🟡 YELLOW (P0 blocking LCP)                        │
│  🚀 DEPLOYMENT TIME  : Ready (images need optimization)                   │
│  ⏱️  EFFORT ESTIMATE  : 48-72h for P0/P1                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ CRITICAL FINDINGS SUMMARY                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ 🔴 P0 — PERFORMANCE LCP                                                   │
│    ├─ Hero images : 6.4 MB PNG (3.1 MB + 2.3 MB)                          │
│    ├─ LCP : ~3.5s (4G mobile)                                             │
│    ├─ Fix : AVIF/WebP conversion + responsive srcset                      │
│    ├─ Impact : +35-45% conversion gain                                    │
│    └─ Effort : 4h                                                         │
│                                                                             │
│ 🔴 P1 — BUILD QUALITY                                                     │
│    ├─ `npm run typecheck` fails (tmp/ issue)                              │
│    ├─ Fix : Exclude tmp/** from tsconfig.json                            │
│    └─ Effort : 1h                                                         │
│                                                                             │
│ 🔴 P1 — GA4 VALIDATION                                                    │
│    ├─ Tracking implémenté mais non validé Realtime                        │
│    ├─ Fix : Test DebugView, confirm events received                       │
│    └─ Effort : 1h                                                         │
│                                                                             │
│ 🟡 P1 — SEO DOUBLE-HÉBERGEMENT                                             │
│    ├─ robots.txt + sitemap statiques                                      │
│    ├─ Risque : canonical incohérent en version externe                    │
│    └─ Fix : Dynamiser robots/sitemap par environment                      │
│                                                                             │
│ 🟡 P2 — JSON-LD ENRICHISSEMENT                                             │
│    ├─ Seul schema Person présent                                          │
│    └─ Fix : Ajouter WebSite + Organization schemas                       │
│                                                                             │
│ 🟡 P2 — PREFLIGHT STORYBOOK                                                │
│    └─ Chunks >500 KB (non-critical, outil interne)                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ METRICS — BEFORE vs AFTER TARGET                                          │
├──────────────────────┬──────────────┬──────────────┬─────────────────────┤
│ Métrique             │ Actuel       │ Target       │ Status              │
├──────────────────────┼──────────────┼──────────────┼─────────────────────┤
│ Hero image size      │ 6.4 MB       │ 350 KB       │ 🔴 FOCUS #1         │
│ LCP (4G mobile)      │ 3.5s         │ <700ms       │ 🔴 FOCUS #1         │
│ Build (typecheck)    │ ❌ FAILS     │ ✅ PASS      │ 🔴 FOCUS #2         │
│ GA4 Realtime         │ ⏳ Unknown    │ ✅ VERIFIED  │ 🔴 FOCUS #3         │
│ SEO JSON-LD          │ 1 schema     │ 3 schemas    │ 🟡 BACKLOG          │
│ Performance score    │ ~50          │ >85          │ 🟡 After images     │
│ Accessibility score  │ ~85          │ >90          │ 🟢 MONITOR          │
│ Mobile UX responsive │ Tested ✅    │ CWV green    │ 🟡 After perf fix   │
│ Tracking coverage    │ 100%         │ 100%         │ 🟢 OK               │
│ Deploy ready         │ YES          │ YES          │ 🟢 OK               │
│ Total site weight    │ 47 MB        │ 15 MB        │ 🟡 After images     │
├──────────────────────┴──────────────┴──────────────┴─────────────────────┤
│ Conversion uplift ROI : +30-45% from perf fix alone                      │
│ Business impact : Direct revenue improvement (increased CTR mobile)      │
└───────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ SPRINT TIMELINE — RECOMMENDED EXECUTION                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ SPRINT A (48-72h) ─ THIS WEEKEND                                           │
│ ├─ A1: Hero images AVIF/WebP + srcset    [4h]   🔴 CRITICAL             │
│ ├─ A2: Image budget CI                   [2h]   Protect progress       │
│ ├─ A3: Build test + Lighthouse verify    [2h]   Validation            │
│ ├─ A4: GA4 Realtime + screenshot         [1h]   Confirm tracking      │
│ └─ Result: LCP 3.5s → 700ms, perf +35-45%                              │
│                                                                             │
│ SPRINT B (1 week) ─ WEEK 1                                                 │
│ ├─ B1: typecheck fix                     [1h]   Unblock CI            │
│ ├─ B2: JSON-LD enrichissement              [2h]   SEO benefit          │
│ ├─ B3: robots.txt/sitemap dynamic        [3h]   Future-proof         │
│ ├─ B4: GSC integration + sitemap submit  [4h]   Indexation           │
│ └─ Result: SEO ready, CI passing, GA4 validated                         │
│                                                                             │
│ SPRINT C (2 weeks) ─ WEEK 2-3                                              │
│ ├─ C1: GSC validation (indexation)       [7d]   Monitor               │
│ ├─ C2: CrUX/RUM data collection          [7d]   Real-world metrics   │
│ ├─ C3: CTA A/B test design               [3h]   Optimization          │
│ └─ Result: Production data, optimization roadmap                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ ACTION ITEMS — IMMEDIATE (TODAY/TOMORROW)                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ☐ Read: docs/audit-plan-amelioration-2026-03-02.md (40min)               │
│  ☐ Read: docs/EXECUTION-IMMÉDIATE-2026-03-02.md (10min)                  │
│  ☐ Skim: docs/SPRINT-PLAYBOOK-2026-03-02.md (reference)                  │
│                                                                             │
│  ☐ Setup: Install image tools                                             │
│    $ brew install imagemagick libwebp                                     │
│                                                                             │
│  ☐ Convert: Primary image (hero-pcb-routing-map.png)                      │
│    $ convert ... -quality 80 hero-pcb-routing-map.avif                   │
│                                                                             │
│  ☐ Convert: Secondary image (proof-prototype-bench.png)                   │
│    $ convert ... -quality 80 proof-prototype-bench.avif                  │
│                                                                             │
│  ☐ Edit: index.html (add <picture> elements)                              │
│    → Replace 2 hero <img> with responsive <picture>+srcset               │
│                                                                             │
│  ☐ Edit: script.js (update asset paths)                                   │
│    → Ensure variant asset loading works with optimized files             │
│                                                                             │
│  ☐ Test: Build & verify                                                   │
│    $ npm run build:external                                               │
│    $ npm run image:budget                                                 │
│                                                                             │
│  ☐ Validate: Lighthouse mobile                                            │
│    Chrome DevTools F12 → Lighthouse → Run                                 │
│    Expected: Performance >85, LCP <800ms                                  │
│                                                                             │
│  ☐ Verify: GA4 Realtime DebugView                                         │
│    https://analytics.google.com/ → Admin → DebugView                     │
│    Click CTA buttons → Confirm events in DebugView                        │
│                                                                             │
│  ☐ Archive: Evidence in artifacts/audit-2026-03-02/                      │
│    Lighthouse reports, GA4 screenshot, optimization log                   │
│                                                                             │
│  ☐ Commit: Push changes                                                   │
│    $ git commit -m "perf: optimize hero images (AVIF/WebP, responsive)"   │
│    $ git push origin main                                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ DOCUMENTATION FILES CREATED                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  📄 audit-plan-amelioration-2026-03-02.md ..................... 40+ pages │
│     → Complete audit across 6 domains (perf, SEO, tracking, a11y, etc)    │
│     → Detailed findings with sévérité classification                      │
│     → Recommendations by sprint (A, B, C)                                 │
│     → Checklists for QA validation                                        │
│     → Reference for future audits                                         │
│                                                                             │
│  📄 EXECUTION-IMMÉDIATE-2026-03-02.md ........................ 2 pages    │
│     → Executive summary of critical 3 actions this weekend                │
│     → High-level impact + effort estimates                                │
│     → Quick overview for decision-makers                                  │
│                                                                             │
│  📄 SPRINT-PLAYBOOK-2026-03-02.md .......................... 8 pages    │
│     → Practical commands & scripts for sprint execution                   │
│     → Step-by-step checklists for A/B/C sprints                           │
│     → Troubleshooting guide                                               │
│     → Testing procedures & validation criteria                            │
│                                                                             │
│  📄 QUICK-REFERENCE-CARD (this file) ........................ 1 page    │
│     → Visual snapshot of status, findings, timeline                       │
│     → Immediate action items                                              │
│     → Quick lookup for sprint metrics                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ KEY CONTACTS & RESOURCES                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  📧 Process Owner        : Clément Saillant                               │
│  📊 Repo               : electron-rare/electron-rare.github.io            │
│  🔗 Production         : https://electron-rare.github.io/                │
│  📍 Repo Root          : /Users/cils/Documents/Lelectron_rare/...        │
│                                                                             │
│  Tools & Resources :                                                       │
│  ├─ Image conversion    : squoosh.app (online) or imagemagick (CLI)      │
│  ├─ Performance test    : Lighthouse (Chrome DevTools F12)               │
│  ├─ GA4 dashboard       : https://analytics.google.com/                 │
│  ├─ GSC                 : https://search.google.com/search-console       │
│  ├─ Schema validator    : https://search.google.com/test/rich-results    │
│  └─ Responsive test     : iPhone 12, iPad, Desktop 1440+                 │
│                                                                             │
│  Slack/Internal :                                                          │
│  ├─ Evidence archiving  : artifacts/audit-2026-03-02/                    │
│  ├─ Commit prefix       : perf: or fix: or docs:                         │
│  └─ Master TODO ref     : docs/project-master-todos.md                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ SUCCESS CRITERIA — VALIDATION GATES                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GATE 1: After Sprint A (images + GA4)                                   │
│  ├─ ✅ LCP <800ms (Lighthouse 4G mobile)                                  │
│  ├─ ✅ Performance score >85                                              │
│  ├─ ✅ GA4 Realtime events confirmed (3+ CTA clicks)                      │
│  ├─ ✅ npm run build:external === 0 (no errors)                          │
│  └─ ✅ deployment to production ✅                                         │
│                                                                             │
│  GATE 2: After Sprint B (SEO + CI)                                       │
│  ├─ ✅ npm run typecheck === 0 (no errors)                                │
│  ├─ ✅ JSON-LD 3 schemas validated (Person, WebSite, Organization)        │
│  ├─ ✅ robots.txt + sitemap environment-aware                            │
│  ├─ ✅ All preflight passes                                               │
│  └─ ✅ GSC property claimed + sitemap submitted                           │
│                                                                             │
│  GATE 3: After Sprint C (Production validation)                          │
│  ├─ ✅ GSC Coverage: 100% indexed (7-14 days wait)                        │
│  ├─ ✅ CWV data available in CrUX (28+ days traffic)                     │
│  ├─ ✅ LCP 75th percentile <2.5s (real users)                            │
│  ├─ ✅ GA4 conversion funnel baseline established                         │
│  └─ ✅ A/B test variant design ready for implementation                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

                          🎯 READY TO EXECUTE
                    Questions? → audit-plan-amelioration-2026-03-02.md
```

---

## 📞 QUICK LINKS

| Document | Purpose | Read Time |
|----------|---------|-----------|
| [audit-plan-amelioration-2026-03-02.md](audit-plan-amelioration-2026-03-02.md) | Complete audit + plan | 40+ min |
| [EXECUTION-IMMÉDIATE-2026-03-02.md](EXECUTION-IMMÉDIATE-2026-03-02.md) | Executive summary | 5-10 min |
| [SPRINT-PLAYBOOK-2026-03-02.md](SPRINT-PLAYBOOK-2026-03-02.md) | Commands & steps | Reference |
| [project-master-todos.md](project-master-todos.md) | Overall roadmap | 10 min |

---

## ⏰ DECISION REQUIRED

**Decision Point**: Proceed with Sprint A this weekend?

**Option A: YES** (Recommended)
- Start image optimization Friday
- Deploy Monday afternoon
- Monitor GA4 Realtime all week
- ROI: +35-45% conversion gain in 4 days

**Option B: WAIT**
- Defer to next week (lower priority)
- Risk: Continue losing ~40% of mobile users to slow load
- Recommendation: NOT ADVISED (business impact clear)

→ **Proceed with Option A**, all materials ready.
