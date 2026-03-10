# Refonte Roadmap -> Plan Sprint Exécutable (2 x 7 jours)

## Résumé
Transformer `docs/refonte-roadmap.md` en plan d’exécution opérationnel sur 14 jours, découpé en 2 sprints de 7 jours, avec:
- tâches ordonnées et dépendances
- owners par rôle (`Frontend`, `UX/CRO`, `QA`, `SEO/Analytics`)
- livrables vérifiables
- critères d’acceptation mesurables
- suivi des risques + blocages

Objectif: donner un document directement exécutable par un autre agent/ingénieur, sans décision restante.

---

## 1) Contexte & objectifs
- Accueillir une audience néophyte puis monter en technicité jusqu’au niveau CTO/BE.
- Renforcer la perception premium et le positionnement system artist.
- Maximiser la conversion via contact simple/pro et brief copiable.
- Garantir une lisibilité mobile forte (390/768/1024/1440).
- Prouver l’exécution par des cas concrets, livrables et instrumentation UI.

---

## 2) Cadre d’exécution

### Conventions
- `Sprint length`: 7 jours
- `Cadence`: daily check + review fin de sprint
- `Owners`: rôles génériques
- `Status`: `TODO | IN_PROGRESS | BLOCKED | DONE`
- `Priority`: `P0 | P1 | P2`

### Gouvernance
- Toute tâche doit inclure une sortie attendue et un acceptance criteria testable.
- Toute tâche `BLOCKED` doit avoir une mitigation documentée dans le registre des risques.
- Le passage Sprint 1 -> Sprint 2 nécessite validation des livrables Sprint 1.

---

## 3) Sprint 1 (J1-J7) - Finalisation UX + conversion

### Objectif sprint
Finaliser UX visible + conversion directe.

### Tableau de tâches

| ID | Priorité | Task | Owner | Dépendances | Sortie attendue | Acceptance criteria | Status |
|---|---|---|---|---|---|---|---|
| S1-01 | P0 | Harmoniser tous les blocs au style hero (typo, alignements, contraste) | Frontend | Aucune | UI homogène sur toutes les sections `.circuit-board` | Rendu cohérent desktop/mobile, pas de régression layout | DONE |
| S1-02 | P0 | Verrouiller Hero final (copy, CTA, schéma plus petit, fond carnet) | Frontend | S1-01 | Hero final conforme direction validée | Hero correspond exactement au wording validé | DONE |
| S1-03 | P0 | Contact prioritaire simple/pro (templates, copier, envoi) | Frontend | S1-01 | Form contact à double mode opérationnel | Switch simple/pro fonctionnel + brief prérempli | DONE |
| S1-04 | P0 | Suppression totale mention Malt (UI + structured data + CTA) | Frontend | S1-03 | Références Malt supprimées dans `src` | `rg -n "malt|Malt" src` ne retourne rien | DONE |
| S1-05 | P1 | Cas & preuves: ajouter vrai visuel anonymisé de livrable | UX/CRO | S1-02 | Asset réel intégré dans section Cas/Preuves | Section Cas contient asset concret + légende | DONE |
| S1-06 | P1 | Ajustement micro-copy conversion (CTA et aides contextuelles) | UX/CRO | S1-02, S1-03 | Copy conversion harmonisée | CTA primaire unique clair au-dessus de la ligne de flottaison | DONE |

### Livrables Sprint 1
- Landing visuellement finalisée
- Contact orienté conversion
- Preuve de livrable intégrée

---

## 4) Sprint 2 (J8-J14) - QA, SEO, tracking, release

### Objectif sprint
Sécuriser release: QA, analytics, SEO, performance.

### Tableau de tâches

| ID | Priorité | Task | Owner | Dépendances | Sortie attendue | Acceptance criteria | Status |
|---|---|---|---|---|---|---|---|
| S2-01 | P0 | QA responsive 390/768/1024/1440 | QA | Sprint 1 validé | Rapport QA responsive | Check-list screenshotée + 0 bug bloquant | DONE |
| S2-02 | P0 | QA accessibilité (focus, clavier, contraste, reduced motion) | QA | S2-01 | Rapport accessibilité | Tous éléments interactifs accessibles clavier | DONE |
| S2-03 | P0 | Smoke test tracking GTM/dataLayer | SEO/Analytics | S2-01 | Trace des events en live | Events clés observés (`experiment_variant_exposed`, `funnel_brief_generated`, `funnel_brief_copied`, `funnel_contact_submitted`) | DONE |
| S2-04 | P1 | KPI framework GA4 (table de pilotage) | SEO/Analytics | S2-03 | Document KPI exploitable | Doc KPI avec définitions + baseline | DONE |
| S2-05 | P1 | SEO on-page final (titles/meta/OG/anchors coherence) | SEO/Analytics | S2-01 | Vérification SEO finale | Validation manuelle + aucun lien mort interne | DONE |
| S2-06 | P1 | Release checklist et go/no-go | QA | S2-02, S2-03, S2-05 | Décision release documentée | DoD signé + build vert | DONE |

### Livrables Sprint 2
- Rapport QA complet
- Validation tracking
- Go/No-Go release

---

## 5) Backlog post-release (P2/P3)

Reference execution: `docs/p2-execution-plan-2026-03-03.md`

### P2
| Item | Valeur attendue | Effort | Prérequis |
|---|---|---|---|
| System map enrichie (interfaces détaillées) | Crédibilité technique renforcée | M | Stabilité UI Sprint 1 |
| Widgets scope/bode approfondis | Perception instrumentation premium | M | QA perf animations |
| Pages dédiées par cas | Meilleure conversion et partage | L | Assets cas + copy validée |

### P3
| Item | Valeur attendue | Effort | Prérequis |
|---|---|---|---|
| SEO avancé case-study (schema dédié) | Acquisition organique long terme | M | Pages cas en place |
| QA automatisée (perf/accessibilité/tracking) | Réduction du risque release | L | Pipeline CI documenté |

---

## 6) Registre risques & mitigation

| Risque | Impact | Probabilité | Mitigation | Owner |
|---|---|---|---|---|
| Dérive visuelle vs lisibilité | Élevé | Moyen | Revue contraste/typographie sur 390/768/desktop | UX/CRO |
| Régression mobile contact | Élevé | Moyen | Tests ciblés contact + templates simple/pro | QA |
| Tracking incomplet | Élevé | Moyen | Smoke test dataLayer + vérif GTM avant go-live | SEO/Analytics |
| Surcharge animations | Moyen | Moyen | Contrôle reduced-motion + optimisation animations actives | Frontend |

---

## 7) Definition of Done release
- [x] build OK
- [x] responsive QA validé
- [x] accessibilité validée
- [x] tracking validé en live
- [x] aucune mention Malt
- [x] footer avec LinkedIn uniquement
- [x] contenu Hero/Contact conforme version finale

---

## 8) Changements interfaces/APIs/types publics
Aucun changement d’API externe prévu.
La transformation porte sur documentation exécutable (`docs/refonte-roadmap.md`) et gouvernance du delivery.

---

## 9) Cas de test et scénarios
1. `?copy=public` puis `?copy=cto` -> variante affichée + event exposition.
2. Contact mode `simple` -> template simple + copy brief + send mail tracké.
3. Contact mode `pro` -> template pro + copy brief + send mail tracké.
4. Navigation mobile 390 -> Hero lisible, schéma non bloquant, contact accessible.
5. `prefers-reduced-motion` actif -> rotations/pulses réduits ou stoppés.

---

## 10) Hypothèses et defaults verrouillés
- Horizon: 14 jours en `2 sprints (7 + 7)`.
- Owners en rôles génériques (`Frontend`, `UX/CRO`, `QA`, `SEO/Analytics`).
- Priorité immédiate: conversion + QA release.
- Le document final reste en français, style opérationnel, sans section marketing longue.
