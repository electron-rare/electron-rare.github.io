# Wireflow Conversion — Sprint DA-00

> Statut 2026-03-14: document historique.
> Il decrit un wireflow et des CTA d'une phase precedente.
> Le site public est maintenant pilote par le code Astro actif et `docs/design-memory-2026-03-14-white-contrast.md`.

Date: 2026-03-02
Statut: READY FOR FIGMA EXECUTION

## Contexte d'execution
- Figma MCP non detecte dans cet environnement (aucune ressource MCP disponible).
- Fallback applique: specification wireflow complete prete a etre reproduite dans Figma manuellement.
- Livrable attendu dans Figma:
  - `00_Wireflow_Desktop_1440`
  - `01_Wireflow_Mobile_390`
  - `02_User_Flow_CTA`

## 1) Page Figma — `00_Wireflow_Desktop_1440`

### Frame principal
- Nom: `Home_Desktop_1440`
- Taille: `1440 x 4200`
- Grid: 12 colonnes, marge 80, gutter 24
- Sections (ordre strict):
  1. `Header_ControlRoom`
  2. `Hero_Impact`
  3. `Identity_Proof`
  4. `Systems_Block`
  5. `Production_Block`
  6. `Conversion_Block`
  7. `Footer_Knowledge`

### Zoning par section
- `Header_ControlRoom`
  - Row A: logo, nav, toggle, status
  - Row B: chips posture studio
- `Hero_Impact`
  - Col gauche: proposition de valeur + manifeste + CTA primary/secondary
  - Col droite: carte studio / signaux
- `Identity_Proof`
  - grille 3 modules (identite, preuves, credibilite)
- `Systems_Block`
  - `FlowDiagram` + `SystemPipeline` + `About`
- `Production_Block`
  - `Projects` + `ProjectsTimeline` + `LabNotes`
- `Conversion_Block`
  - `TrustStrip` + `Contact`
- `Footer_Knowledge`
  - liens process, stack, contact pro

### Interactions minimales (wireflow)
- Nav -> ancres core: `#a-propos`, `#projets`, `#contact`
- CTA primaire LinkedIn sur Hero, section intermediaire, Contact
- CTA secondaire Malt sur Hero, section intermediaire, Contact

## 2) Page Figma — `01_Wireflow_Mobile_390`

### Frame principal
- Nom: `Home_Mobile_390`
- Taille: `390 x 5300`
- Grid: 4 colonnes, marge 16, gutter 12

### Ordre mobile obligatoire
1. Header compact
2. Hero + CTA primaire above the fold
3. Identity
4. Flow
5. Pipeline
6. About
7. Projects
8. Timeline
9. Lab Notes
10. Trust
11. Contact
12. Footer

### Regles mobile
- Pas d'overflow horizontal
- Boutons >= 44px hauteur
- Contraste CTA suffisant
- Parcours contact en 2 clics max

## 3) Page Figma — `02_User_Flow_CTA`

### Diagramme user-flow
- Entrées trafic:
  - Social direct
  - Search organique
  - Referral
- Noeuds:
  1. `Hero_View`
  2. `Proof_Scan`
  3. `System_Understanding`
  4. `Intent_Contact`
  5. `Outbound_LinkedIn_Primary`
  6. `Outbound_Malt_Secondary`

### Conditions de passage
- `Hero_View -> Intent_Contact`: proposition de valeur + CTA visible
- `Proof_Scan -> Intent_Contact`: preuves suffisantes + confiance
- `System_Understanding -> Intent_Contact`: comprehension methodologie + resultats

### Events associes
- `cta_hero_contact`
- `outbound_linkedin_contact`
- `outbound_malt_contact`

## 4) Tokens wireflow (niveau schema)

### Typographie
- Display: serif editorial
- Body/UI: sans lisible
- Micro-labels techniques: mono

### Couleur
- Base atelier claire (ivoire/crème), encre sombre pour le texte
- Accent principal cuivre/ambre (CTA, highlights)
- Accent secondaire teal/atelier (repères, liens)
- Accents techniques possibles (très mesurés) pour signal/état si besoin

### Motion
- Feedback d’interaction (hover/focus/active) + reveal discret par bloc
- Etats actifs nav lisibles, sans sur-effets
- `prefers-reduced-motion` obligatoire

## 5) Checklist de validation wireflow
1. Ancres core presentes et liees.
2. CTA primaire/secondaire presents dans 3 zones min.
3. Hierarchie visuelle lisible en moins de 2 secondes sur Hero.
4. Structure complete desktop + mobile.
5. Aucun conflit avec contrat tracking.

## 6) Definition of done DA-00 (wireflow)
- Pages Figma nommees exactement comme specifie.
- User flow CTA valide.
- Handoff DA-01 possible sans decision manquante.
