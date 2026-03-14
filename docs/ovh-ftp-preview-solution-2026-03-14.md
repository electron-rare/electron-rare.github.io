# OVH FTP Preview Deploy

## Pourquoi

Le deploy FTP direct depuis la machine locale bloque sur le canal de donnees FTP OVH.  
Le build local fonctionne, mais l'upload reste instable.

## Solution retenue

Deployer vers OVH FTP depuis un runner GitHub Actions public.

Le runner :
- build le site avec la bonne `PUBLIC_SITE_URL`
- choisit la cible `preview` ou `production`
- synchronise `dist/` via `lftp`

## Point critique OVH

Sur cet hebergement, le chemin valide depend du protocole :
- FTP : `/www`
- SFTP : `/home/ecobsoleiq/www`

Il ne faut pas reutiliser le chemin absolu SFTP dans le flux FTP.
Sinon OVH cree un arbre imbrique du type :
- `/home/ecobsoleiq/home/ecobsoleiq/www/...`

qui n'est pas le docroot public.

## Secrets GitHub requis

- `OVH_FTP_HOST`
- `OVH_FTP_USER`
- `OVH_FTP_PASS`
- `OVH_FTP_PORT`
- `OVH_FTP_REMOTE_DIR`

## Variables GitHub requises

- `PUBLIC_SITE_URL_PROD=https://www.lelectronrare.fr/`
- `PUBLIC_SITE_URL_PREVIEW=https://www.lelectronrare.fr/preview/`

## Workflow

Fichier :
- `.github/workflows/deploy-ovh-ftp.yml`

Script cible :
- `scripts/deploy-ovh-ftp-target.sh`

## Usage

### Preview

```bash
gh workflow run deploy-ovh-ftp.yml --ref <branche> -f target=preview
```

### Production

```bash
gh workflow run deploy-ovh-ftp.yml --ref <branche> -f target=production
```
