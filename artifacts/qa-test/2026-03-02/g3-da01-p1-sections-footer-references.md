# G3 DA-01 P1 — Harmonisation sections + footer + references GitHub

Date: 2026-03-02  
Scope: harmoniser les sections conversion-first et intégrer les references projets GitHub fournies.

## Changements appliques

- `src/components/sections/SystemPipeline.tsx`
  - labels pipeline harmonises (framing pro/automatisme).
  - ajout intro section + chips de signaux.

- `src/components/sections/FlowDiagram.tsx`
  - ajout intro section + chips narratifs du flux mission.

- `src/components/sections/About.tsx`
  - titre et lead alignes sur le positionnement "profil systeme".

- `src/components/sections/Contact.tsx`
  - ajout lead conversion orientee cadrage mission.

- `src/components/sections/Projects.tsx`
  - harmonisation du bloc projets.
  - ajout panel de references GitHub:
    - `KomplexKapharnaum/KXKM_ESP32_Audio_Battery_hardware`
    - `KomplexKapharnaum/LEDcurtain_hardware`
    - `KomplexKapharnaum/kxkm_Ve.direct`
    - `KomplexKapharnaum/KXKM_Batterie_Parallelator`
    - `KomplexKapharnaum/STM32_ESP32_firmware`
    - `KomplexKapharnaum/LEDcurtain`
    - `electron-rare/`

- `src/components/sections/ProjectsTimeline.tsx`
  - ajout entree timeline "Open repos references" vers GitHub.
  - ajustement wording des liens de preuve.

- `src/components/sections/LabNotes.tsx`
  - ajout lead de debrief technique.

- `src/components/sections/TrustStrip.tsx`
  - enrichissement des preuves avec details et mention GitHub.

- `src/pages/index.astro`
  - footer passe en mode knowledge/protocoles/links externes (LinkedIn, Malt, Bandcamp, GitHub).

- `src/styles/global.css`
  - ajout classes de coherence P1:
    - `section-lead`, `section-signal-row`, `section-signal-chip`
    - `project-stage`, `project-reference-*`
    - `trust-pill-detail`
    - `footer-column-title`, `footer-protocol-list`, ajustements `footer-grid`

## Contrats verifies (non modifies)

- Anchors core conserves:
  - `#a-propos`
  - `#projets`
  - `#contact`
- Contrat tracking conserve (events existants conserves; aucune suppression d'event).
- Contrat SEO/GTM conserve.

## Verification technique

- `npm run typecheck` -> OK (0 erreur)
- `npm run build` -> OK (build Astro statique complet)

## Notes

- QA responsive/accessibilite fine (visuelle cross-breakpoints) reste a confirmer en revue manuelle finale.
