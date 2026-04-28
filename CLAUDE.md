# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Corporate site for **L'électron rare** (electronics consulting studio) — an Astro 5 SSR site with a React Three Fiber 3D product viewer as its centerpiece. Production URL: `https://www.lelectronrare.fr/`

## Commands

```bash
npm run dev              # Astro dev server (default port 4321)
npm run build            # Production build (SSR, outputs dist/)
npm run build:external   # Build with PUBLIC_SITE_URL for external domain
npm run preview          # Preview production build locally
npm run typecheck        # astro check (TypeScript validation)
npm run storybook        # Component dev on port 6006
npm run lab:dev          # Sub-app (apps/lab-interactif) dev server
npm run tracking:check   # Validate GA4 tracking events
npm run image:budget     # Check image sizes against budget
```

**Docker build & deploy (from `/home/electron/electron-rare.github.io/infra/`):**
```bash
docker compose -f docker-compose.site.yml build electron-rare-site
docker compose -f docker-compose.site.yml up -d electron-rare-site
```

## Architecture

**Runtime:** Astro SSR with `@astrojs/node` adapter (standalone mode). The built site runs as `node dist/server/entry.mjs` on port 4321, behind Traefik.

**Styling:** Tailwind CSS 4 integrated via `@tailwindcss/vite` plugin — no separate tailwind.config. Uses `cva` + `clsx` + `tailwind-merge` for component variants.

**Path alias:** `@/*` maps to `src/*`.

### Site URL & Base Path

The site supports multiple deployment targets (GitHub Pages subpath, custom domain). `PUBLIC_SITE_URL` env var drives both `astro.config.mjs` and `src/lib/site.ts`. All internal links must use `withSiteBase()` from `src/lib/site.ts` to work across deployments.

### 3D Viewer (`src/components/BmuViewer.tsx`)

The main differentiating feature — a scroll-driven 3D PCB viewer on the `/preview/` page:
- Loads 5 GLTF models (BMU, I2C Repeater, MOSFET switches) from `public/assets/models3d/`
- 16+ named scroll sections, each defining camera position, rotation, focus card, and explode amount
- Scroll progress (0–1) interpolates between section states for smooth transitions
- Uses `@react-three/drei` Html component for interactive PCB label overlays
- Post-processing: Bloom + Vignette via `@react-three/postprocessing`
- VideoTexture meshes for PCB bottom views
- Brand color: `#5bd1d8` (cyan)

### Pages

- `index.astro` — Landing page with section components (Hero, About, CaseStudies, GraphicSprints, Faq, Contact)
- `preview.astro` — 3D scroll-driven viewer (1000vh scroll track, fixed overlays, dot navigation)
- `api/submit-lead.ts` — Server endpoint posting to Frappe CRM
- `formation.astro`, `portfolio.astro`, `ops.astro` — Content pages

### CRM Integration

Contact form submits to Frappe CRM via `src/pages/api/submit-lead.ts`. Requires `FRAPPE_URL`, `FRAPPE_API_KEY`, `FRAPPE_API_SECRET` env vars (set in `infra/.env`).

## CI/CD

Push to `main` triggers GitHub Actions (`.github/workflows/deploy-cloudflare.yml`):
1. `npm ci` + `npm run build` with `PUBLIC_SITE_URL=https://www.lelectronrare.fr/`
2. SCP `dist/` to Tower server
3. Docker container restart (node:22-alpine running `dist/server/entry.mjs`)
4. Health check on `http://127.0.0.1:4321/`

## GLB Pipeline

KiCad `.kicad_pcb` → STEP export → FreeCAD Docker tessellation → GLB with per-component materials and KiCad raytraced textures. Models stored in `public/assets/models3d/`.
