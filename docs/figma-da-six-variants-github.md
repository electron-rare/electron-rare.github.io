# DA Variants — Index de référence (Reset v1)

Ce document centralise les 10 variantes prêtes à arbitrer après reset DA.

Référence brute: [figma-da-v1-v10-innovation-reset.md](./figma-da-v1-v10-innovation-reset.md)

## Modes activables

- GitHub Pages: `/?da=v1` ... `/?da=v10`
- Astro/Web externe: même paramètre dans la route concernée.

## Grille décisionnelle

| Axe | Top prioritaire | Secondary |
|---|---|---|
| Rupture visuelle | V4, V5 | V2, V10 |
| Conversion | V7, V1 | V10, V3 |
| Positionnement électronique | V4, V9 | V5, V1 |

## Contrôle obligatoire

- Ancres conservées: `#a-propos`, `#projets`, `#contact`
- CTA conservés: `Voir les projets`, `Démarrer une mission`, `Voir le profil`
- Tracking GA4 contractuel non modifié
- Pas de modifications de contenu sémantique sans arbitrage conversion

## Artefacts de validation

- `artifacts/da-qa/2026-03-02/v10-preview/v{version}-{390|768|1024|1440}.png`
- `artifacts/da-qa/2026-03-02/gh-variants-v8-v11-qa-report.md`

## Prochain sprint

1. Sélectionner 2 variantes fortes (recommandé: V4 + V7).
2. Produire une passe Figma "frame par breakpoint" pour ces 2 uniquement.
3. QA mobile strict.
4. Exporter le set final retenu dans un dossier d’artefacts `artifacts/figma-capture/2026-03-02/reset-pack/`.
