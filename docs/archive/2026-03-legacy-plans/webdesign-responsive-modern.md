# Webdesign Responsive Moderne - Checklist Actionnable

> Statut 2026-03-14: document historique.
> Le site n'est plus un site statique GitHub Pages.
> Le referentiel responsive actif est le code Astro en `src/` et `docs/da-01-implementation-backlog.md`.

Date: 2026-03-01

## Objectif
Améliorer le rendu visuel, la lisibilité mobile et l'ergonomie moderne sans casser la simplicité d'un site statique GitHub Pages.

## Améliorations déjà appliquées
- `scroll-margin-top` sur sections ancrées (menu sticky plus propre).
- Cibles tactiles renforcées sur navigation, boutons et liens contact.
- Pass de style studio électrique appliquée (`src/styles/global.css` + `src/components/*`).
- `prefers-reduced-motion` maintenu pour réduire les animations.

## Priorités prochaines itérations
1. Typographie
- Ajuster l'échelle (`clamp`) pour titres/sous-titres sur mobile compact.
- Harmoniser interlignage et largeur de ligne (45-75 caractères).

2. Responsive layout
- Tester sur largeurs clés: 390px, 768px, 1024px, 1440px.
- Vérifier qu'aucun contenu ne déborde horizontalement.

3. Accessibilité
- Contraste texte/CTA conforme WCAG 2.2.
- Focus visible partout au clavier.
- Ordre de navigation cohérent (tab order).

4. Performance UI
- Garder les animations discrètes et désactivables (`prefers-reduced-motion`).
- Contrôler le poids des assets visuels (notamment OG image).

## Critères d'acceptation
- Aucun overflow horizontal sur mobile.
- CTA principaux visibles sans scroll excessif.
- Navigation clavier complète + focus visible.
- Lighthouse mobile >= 90 perf / >= 95 accessibilité / SEO 100.

## Références (officielles)
- MDN Responsive Design:
  https://developer.mozilla.org/docs/Learn_web_development/Core/CSS_layout/Responsive_Design
- MDN Container Queries:
  https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries
- WCAG 2.2 Quick Reference:
  https://www.w3.org/WAI/WCAG22/quickref/
- Web.dev - Content Visibility:
  https://web.dev/articles/content-visibility
- Web.dev - CLS optimization:
  https://web.dev/articles/optimize-cls
