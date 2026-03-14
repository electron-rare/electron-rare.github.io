#!/usr/bin/env bash

set -euo pipefail

TARGET="${1:-preview}"
LOCAL_DIR="${2:-dist}"
FTP_ENV_FILE="${FTP_ENV_FILE:-.env.ftp}"

load_env_file() {
  if [[ ! -f "$FTP_ENV_FILE" ]]; then
    return
  fi

  set -a
  # shellcheck disable=SC1090
  source "$FTP_ENV_FILE"
  set +a
}

resolve_base_remote_dir() {
  if [[ -n "${FTP_REMOTE_DIR:-}" ]]; then
    printf '%s\n' "${FTP_REMOTE_DIR%/}"
    return
  fi

  if [[ -n "${FTP_URL:-}" && "$FTP_URL" =~ ^ftp://[^@:/]+@[^:/]+(:([0-9]+))?(/.*)?$ ]]; then
    printf '%s\n' "${BASH_REMATCH[3]:-/www}"
    return
  fi

  printf '%s\n' "/www"
}

set_target_env() {
  local base_remote_dir
  base_remote_dir="$(resolve_base_remote_dir)"

  case "$TARGET" in
    preview)
      export PUBLIC_SITE_URL="${PUBLIC_SITE_URL_PREVIEW:-https://www.lelectronrare.fr/preview/}"
      export FTP_REMOTE_DIR="${base_remote_dir}/preview"
      ;;
    production|prod)
      export PUBLIC_SITE_URL="${PUBLIC_SITE_URL_PROD:-${PUBLIC_SITE_URL:-https://www.lelectronrare.fr/}}"
      export FTP_REMOTE_DIR="${base_remote_dir}"
      ;;
    *)
      echo "Unknown target: ${TARGET}. Use 'preview' or 'production'."
      exit 1
      ;;
  esac

  unset FTP_URL
}

main() {
  load_env_file
  set_target_env

  if [[ "${DEPLOY_TARGET_SKIP_BUILD:-0}" != "1" ]]; then
    npm run build:external
  else
    echo "[deploy-ovh-ftp-target] Skipping build:external (already built)."
  fi

  # The root .htaccess contains root-scoped Apache rules (`/index.html`, `/_astro/`)
  # that break the preview when uploaded inside `/preview`.
  if [[ "$TARGET" == "preview" && -f "${LOCAL_DIR}/.htaccess" ]]; then
    echo "[deploy-ovh-ftp-target] Removing .htaccess from preview payload."
    rm -f "${LOCAL_DIR}/.htaccess"
  fi

  bash scripts/deploy-ovh-ftp.sh "$LOCAL_DIR"
}

main "$@"
