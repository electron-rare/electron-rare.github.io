# Asset Production Backlog — Carnet de labo electronique (V2)

> Statut 2026-03-14: backlog historique d'assets.
> Le langage visuel public actuel est plus sobre et plus blanc contraste que cette phase "carnet de labo".

Date: 2026-03-02  
Sprint: Assets visuels avances  
Scope: Home uniquement (`hero`, zone preuves, textures de fond)

## Priorites
1. **A1 — Hero PCB routing map**  
  - format: base 1024x1024 + crop-safe desktop/mobile  
  - usage: visuel principal droite hero  
  - critere: traces/vias lisibles, pas de texte parasite

2. **A2 — Instrument panel oscilloscope/multimetre**  
  - format: 1024x1024  
  - usage: carte secondaire hero  
  - critere: lisible en vignette, contraste stable

3. **A3 — Carnet de labo ouvert annote**  
  - format: 1024x1024  
  - usage: visuel bas hero gauche  
  - critere: style editorial technique, sans logo

4. **A4 — Texture technique secondaire (traces/vias/subgrid)**  
  - format: 1024x1024 (tileable si possible)  
  - usage: overlays subtils desktop  
  - critere: impact visuel sans nuire au texte

5. **A5 — Fallbacks low-noise mobile (x2)**  
  - format: 1024x1024  
  - usage: remplacements automatiques en 390/768  
  - critere: zone calme CTA, bruit visuel reduit

## Definition of Done par asset
1. prompt V2 valide (style + guardrails)
2. image generee dans `output/imagegen/mistral/carnet-labo-assets-v2/` ou fallback cache
3. nommage stable
4. integration Hero/CSS liee
5. capture QA desktop/mobile validee

## Convention nommage
- `hero-pcb-routing-map-v2.png`
- `hero-instrument-panel-v2.png`
- `hero-carnet-labo-open-v2.png`
- `texture-pcb-subgrid-v2.png`
- `hero-pcb-routing-map-mobile-low-noise-v2.png`
- `hero-instrument-panel-mobile-low-noise-v2.png`
