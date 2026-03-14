# Backlog DA-01 - White Contrast Consolidation

Updated: 2026-03-14
Source: homepage Astro synchronisee avec la base OVH

## Objectif
Consolider la DA actuelle en version claire, contraste blanc, sans reintroduire l'ancienne variante `studio/figma` ni le vieux modele GitHub Pages statique.

## Sources de verite
- Structure homepage: `src/pages/index.astro`
- Sections actives: `Hero`, `About`, `CaseStudies`, `GraphicSprints`, `Faq`, `Contact`
- Copy et donnees: `src/content/home-content.ts`
- Theme et layout: `src/layouts/BaseLayout.astro`, `src/styles/global.css`, `src/styles/home-workbench.css`
- Tracking: `src/lib/tracking.ts` + `src/layouts/BaseLayout.astro`
- Deploiement: `docs/ovh-ftp-preview-solution-2026-03-14.md`

## Decisions DA
- Theme par defaut: `high-contrast` clair, oriente blanc/ivoire.
- Palette de travail:
  - fonds `#ffffff`, `#faf7f2`, `#f5efe4`
  - texte `#0b0a09`, `#2f2a25`
  - accent froid `#0b5d65`
  - accent chaud `#7f4a23`
- Bouton contraste: non expose au public. Pas de toggle tant qu'il n'existe pas comme fonctionnalite produit reelle.
- Rendition souhaitee:
  - surfaces blanches nettes
  - contraste fort mais pas clinique
  - traces teal/rust en accent, pas en fond systematique
  - motion reduite et discrète

## Mapping section -> composants reels
1. `Header_Navigation`
- Cible: `src/pages/index.astro` + `src/layouts/BaseLayout.astro`
- Elements:
  - marque
  - nav anchors
  - acces direct formation, lab, FAQ, contact

2. `Hero_Conversion`
- Cible: `src/components/sections/Hero.tsx`
- Elements:
  - promesse
  - statut/disponibilite
  - CTA contact
  - fond photo + lockup

3. `About_Approche`
- Cible: `src/components/sections/About.tsx`
- Elements:
  - portrait
  - expertise
  - secteurs
  - chips d'offres / familles de sujets

4. `Cases_Proof`
- Cible: `src/components/sections/CaseStudies.tsx`
- Elements:
  - cas concrets
  - preuve de terrain
  - articulation industrie / culture / produit

5. `Field_Media`
- Cible: `src/pages/index.astro` + `src/styles/global.css`
- Elements:
  - photo strip
  - video strip

6. `Mission_Formats`
- Cible: `src/components/sections/GraphicSprints.tsx`
- Elements:
  - 3 formats
  - progression
  - CTA de contact

7. `Faq_Trust`
- Cible: `src/components/sections/Faq.astro`
- Elements:
  - details/summary
  - reponse rapide aux objections

8. `Contact_ClearTerminal`
- Cible: `src/components/sections/Contact.astro`
- Elements:
  - bloc contact type minitel mais en rendition claire
  - email draft
  - formulaire direct
  - LinkedIn

9. `Footer_Knowledge`
- Cible: `src/pages/index.astro`
- Elements:
  - navigation secondaire
  - ressources
  - contact direct

## Backlog P0
- [x] Forcer la cascade sur la DA blanche dans `BaseLayout.astro`, `site.ts`, `global.css`, `home-workbench.css`.
- [x] Relever les derniers blocs sombres restants: `hero-bg-photo`, `photo-strip`, `video-strip`, `contact-minitel`, FAQ focus.
- [ ] Verifier la lisibilite des CTA sur blanc.
- [ ] Verifier que la home et `formation` partagent bien le meme socle visuel en preview live.

## Backlog P1
- [ ] Supprimer les references documentaires a `#projets`, Malt, GitHub Pages static prod, dual-rail hero, contrast toggle.
- [ ] Verifier les events `data-track` sur les CTA actifs uniquement.
- [x] Recaler `tracking:check` sur le contrat Astro actif pour sortir des faux positifs legacy.
- [x] Valider preview OVH.
- [x] Valider prod OVH.

## Backlog P2
- [x] Supprimer les reliquats `.site-contrast-toggle` du CSS global.
- [ ] Evaluer si un vrai theme secondaire doit exister plus tard ou si le mode blanc reste la seule version publique.
- [ ] Consolider une archive explicite des anciens artefacts DA pour eviter toute reintroduction.

## Gates de validation
### Gate Build
- `npm run typecheck`
- `npm run build:external`
- `npm run tracking:check`

### Gate UX
- Aucun panneau critique ne reste sur fond sombre.
- Mobile 390/768 sans debordement.
- CTA primary/secondary lisibles sur fond clair.
- Contact completement utilisable.

### Gate Accessibilite
- Focus visible sur nav, FAQ, CTA, formulaire.
- Contraste texte/fond conforme sur les composants critiques.
- `prefers-reduced-motion` conserve.

### Gate Tracking
- Aucun event legacy mort.
- Clics hero/contact/lab/linkedin/email visibles dans la dataLayer.

### Gate Deploy
- Preview OK avant production.
- Verification live des URL et ancres.

## Definition of done
1. Le site public sert par defaut une version blanc contraste coherente.
2. Aucun element critique de l'ancienne DA sombre ne reste visible.
3. Les docs actives parlent du vrai site OVH/Astro actuel.
4. Preview et production sont verifiees sur cette base.
