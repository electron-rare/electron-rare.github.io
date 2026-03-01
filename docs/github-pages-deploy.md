# Déploiement GitHub Pages (site personnel)

## Prérequis
- `index.html` présent à la racine.
- `assets/styles.css` référencé en chemin relatif.
- Branche principale à jour.

## Déploiement
1. GitHub > dépôt > **Settings** > **Pages**.
2. Dans **Build and deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: `main` + `/ (root)`
3. Enregistrer.
4. Attendre l'URL générée par GitHub Pages.

## Vérification post-déploiement
- Ouvrir l'URL publique.
- Vérifier les sections: héro, à-propos, projets, contact.
- Vérifier les ancres du menu.

## Personnalisation rapide
- Modifier le nom, le pitch et les projets dans `index.html`.
- Ajuster couleurs/espacements dans `assets/styles.css`.

## Traçabilité
- Mettre à jour `evidence/manifest.json` et `artifacts/*/<date>/` à chaque itération.
