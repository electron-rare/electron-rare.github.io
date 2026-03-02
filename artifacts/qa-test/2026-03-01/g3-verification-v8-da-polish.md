# G3 — Vérification DA / Responsive / Accessibilité (v8)

Date: 2026-03-01

## Scope
- Validation de la passe DA studio pour la page d'accueil Astro (`src/pages/index.astro` + sections).
- Vérification visuelle/UX locale (sans exécution de tests automatisés dans cette étape).

## Changes appliqués
1. Consolidation tokens visuels globaux
- Nouveau tokenset électrique dans `src/styles/global.css`.
- Classes sémantiques studio (`studio-panel`, `studio-link`, `studio-chip*`, `studio-muted`, etc.).

2. UI systémique alignée
- `src/components/ui/button.tsx` et `src/components/ui/card.tsx` sur tokens.
- Header/nav/footer dans `src/pages/index.astro`.
- Refonte visuelle et copy de toutes les sections: `Hero`, `About`, `Projects`, `Contact`.

3. Gouvernance DA
- Conformité maintenue au brief interne (experimental/noise, électrique, priorité lisibilité/impact).

## Vérifications documentées
- Aucune référence couleur violette dominante restante dans classes Tailwind des sections.
- Contrat tracking préservé (mêmes `data-track` et événements).
- `prefers-reduced-motion` conservé dans `global.css`.
- Classes d’accessibilité clavier conservées (focus-visible).

## Checklist métier
- [x] Direction artistique visuelle uniforme (accroche hero + side card + sections).
- [x] CTA lisibles et conservés: projets, contact, profil.
- [x] Références externes conservées: LinkedIn / Malt / Bandcamp avec tracking.
- [ ] Revue responsive 390/768/1024/1440 (audit visuel à réaliser en session de dev).
- [ ] Revue accessibilité complète (focus order + contraste réel sur composants interactifs).

## Prochaine action QA
- Exécuter Lighthouse prod + revue GA4/SS to close P2 sprint.
