# Plan P2 Exécutable (2026-03-03)

## Objectif P2
Monter la landing d’un niveau premium sans casser la conversion actuelle: `System Map` riche, mini-widgets instrumentation avancés, pages cas dédiées SEO.

## Cadre
- Horizon: 14 jours
- Owners: `Frontend`, `UX/CRO`, `QA`, `SEO/Analytics`
- Status: `TODO | IN_PROGRESS | BLOCKED | DONE`
- Priorité: `P2`

## Lot A - System Map enrichie (J1-J4)

| ID | Task | Owner | Dépendances | Sortie attendue | Acceptance criteria | Status |
|---|---|---|---|---|---|---|
| P2-A1 | Enrichir la map avec noeuds/liaisons métier (Power/MCU/RF/Audio/Test) | Frontend | Aucune | Map interactive en 1 colonne | Noeud actif + liens hot + tabs Inputs/Outputs/Risques | DONE |
| P2-A2 | Ajouter vues interfaces par noeud (I2C/SPI/UART/Analog/RF/Power) | Frontend | P2-A1 | Chips interfaces + details contextuels | Chaque noeud affiche ses interfaces propres | DONE |
| P2-A3 | Ajouter mode mobile touch-first (hit area + lisibilité) | Frontend | P2-A1 | UX mobile robuste | Cibles tactiles >= 40px, aucun overlap 390px | DONE |
| P2-A4 | QA accessibilité map (tab/focus/aria) | QA | P2-A1 | Rapport QA map | Navigation clavier complète, rôles ARIA valides | DONE |

## Lot B - Widgets scope/bode approfondis (J5-J9)

| ID | Task | Owner | Dépendances | Sortie attendue | Acceptance criteria | Status |
|---|---|---|---|---|---|---|
| P2-B1 | Scope v2: 3 états (idle/hover/active) + lecture explicative | Frontend | P2-A4 | Module scope plus crédible | Chaque état change visuel + texte impact décision | DONE |
| P2-B2 | Bode v2: curseur fréquence + point de coupure + message implication | Frontend | P2-B1 | Mini-plot décisionnel | Affiche gain, zone passante, warning hors marge | DONE |
| P2-B3 | Reduced-motion strict sur widgets | Frontend | P2-B1 | Animations dégradées proprement | Avec `prefers-reduced-motion`, pas d’animation auto | DONE |
| P2-B4 | Validation perf animation (desktop + mobile) | QA | P2-B1,P2-B2 | Rapport perf P2 | Aucun stutter visible, interaction fluide au scroll | DONE |

## Lot C - Pages cas dédiées SEO (J10-J14)

| ID | Task | Owner | Dépendances | Sortie attendue | Acceptance criteria | Status |
|---|---|---|---|---|---|---|
| P2-C1 | Créer template page cas (`/cas/[slug]`) | Frontend | P2-A2 | Gabarit réutilisable | Hero cas + contexte + intervention + impact + CTA | DONE |
| P2-C2 | Publier 3 cas (Studio Core / Design Produit / R&D Sonore) | UX/CRO | P2-C1 | 3 pages prêtes indexation | Chaque page contient preuve + résultat + CTA contact | DONE |
| P2-C3 | Maillage interne landing -> pages cas -> contact | SEO/Analytics | P2-C2 | Flux navigation SEO | Liens internes valides, aucun lien mort | DONE |
| P2-C4 | Meta/OG/schema par cas + QA indexabilité | SEO/Analytics | P2-C2 | SEO on-page final cas | title/meta/OG + schema Article/CreativeWork valides | DONE |

## Livrables P2
- System Map premium et accessible
- Modules Scope/Bode v2 orientés décision
- 3 pages cas SEO-ready et maillées

## Rapports P2
- `docs/p2-lot-a-accessibilite-map-2026-03-03.md`
- `docs/p2-lot-b-widgets-perf-2026-03-03.md`
- `docs/p2-lot-c-seo-cas-2026-03-03.md`
- `docs/qa-artifacts/p2-qa-report.json`

## Risques P2

| Risque | Impact | Probabilité | Mitigation | Owner |
|---|---|---|---|---|
| Sur-design au détriment de la lisibilité | Élevé | Moyen | Revue mobile 390 + contraste avant merge | UX/CRO |
| Widgets trop lourds | Moyen | Moyen | Limiter animation active + reduced-motion | Frontend |
| Délais contenus cas | Élevé | Moyen | Gabarit unique + collecte assets J10 | UX/CRO |
| Régression tracking funnel | Élevé | Faible | Rejouer `sprint2-qa.cjs` + smoke events | SEO/Analytics |

## Definition of Done P2
- [x] `npm run build` vert
- [x] `npm run typecheck` vert (0 erreur)
- [x] System Map validée mobile + clavier
- [x] Scope/Bode v2 validés reduced-motion
- [x] 3 pages cas publiées et liées depuis landing
- [x] Meta/OG/schema cas validés
- [x] Tracking funnel toujours intact
