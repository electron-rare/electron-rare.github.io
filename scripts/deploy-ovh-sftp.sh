#!/usr/bin/env bash

set -euo pipefail

LOCAL_DIR="${1:-dist}"
FTP_HOST="${FTP_HOST:-ftp.cluster129.hosting.ovh.net}"
FTP_USER="${FTP_USER:-ecobsoleiq}"
FTP_REMOTE_DIR="${FTP_REMOTE_DIR:-/home/ecobsoleiq/www}"
FTP_ENV_FILE="${FTP_ENV_FILE:-.env.ftp}"
FTP_PASS="${FTP_PASS:-}"
FTP_URL="${FTP_URL:-}"
DEPLOY_SFTP_DELETE="${DEPLOY_SFTP_DELETE:-0}"

if [[ -z "$FTP_PASS" && -n "${FTP_PASS_FILE:-}" && -f "$FTP_PASS_FILE" ]]; then
  FTP_PASS="$(tr -d '\r\n' < "$FTP_PASS_FILE")"
fi

if [[ -z "$FTP_PASS" && -f "$FTP_ENV_FILE" ]]; then
  # shellcheck disable=SC1090
  source "$FTP_ENV_FILE"
fi

if [[ -z "${FTP_PASS:-}" ]]; then
  echo "Missing FTP_PASS."
  echo "Set it with: FTP_PASS='...'"
  echo "or in: ${FTP_ENV_FILE} (local, non versioned)"
  exit 1
fi

if [[ -n "$FTP_URL" ]]; then
  if [[ "$FTP_URL" =~ ^s?ftp://([^@:/]+)@([^:/]+)(:([0-9]+))?(/.*)?$ ]]; then
    FTP_USER="${BASH_REMATCH[1]}"
    FTP_HOST="${BASH_REMATCH[2]}"
  fi
fi

if [[ -z "$FTP_REMOTE_DIR" ]]; then
  FTP_REMOTE_DIR="/home/ecobsoleiq/www"
fi

if [[ ! -d "$LOCAL_DIR" ]]; then
  echo "Local directory not found: $LOCAL_DIR"
  exit 1
fi

if ! command -v lftp >/dev/null 2>&1; then
  echo "lftp is required. Install via: brew install lftp | apt-get install lftp"
  exit 1
fi

SYNC_DIRS=("assets" "_astro" "lab")
ROOT_FILES=("index.html" "robots.txt" "sitemap.xml" "favicon.ico" "favicon.svg" "favicon-16x16.png" "favicon-32x32.png" "apple-touch-icon.png")

if [[ "$DEPLOY_SFTP_DELETE" != "1" ]]; then
  mirror_delete_flag=""
else
  mirror_delete_flag="--delete"
fi

CMD_FILE="$(mktemp)"
trap 'rm -f "$CMD_FILE"' EXIT

cat > "$CMD_FILE" <<'EOF'
set net:timeout 120
set sftp:connect-program "ssh -a -x -o ConnectTimeout=20 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"
set cmd:fail-exit true
set net:max-retries 6
set net:reconnect-interval-base 5
set net:reconnect-interval-max 30
set mirror:use-pget-n 1
set xfer:clobber on
EOF
printf 'open -u "%s","%s" "sftp://%s"\n' "$FTP_USER" "$FTP_PASS" "$FTP_HOST" >> "$CMD_FILE"

# Sync known directories first (stable on OVH shared hosting).
for sync_dir in "${SYNC_DIRS[@]}"; do
  local_dir="$LOCAL_DIR/$sync_dir"
  remote_dir="$FTP_REMOTE_DIR/$sync_dir"
  if [[ -d "$local_dir" ]]; then
    printf 'mirror --reverse --dereference --continue --only-newer %s --verbose "%s" "%s"\n' \
      "$mirror_delete_flag" "$local_dir" "$remote_dir" >> "$CMD_FILE"
  else
    echo "Skipping missing directory: $local_dir" >&2
  fi
done

# Sync root assets one-by-one to avoid long-running full-root mirror timeouts.
for root_file in "${ROOT_FILES[@]}"; do
  if [[ -f "$LOCAL_DIR/$root_file" ]]; then
    printf 'put -O "%s" "%s"\n' "$FTP_REMOTE_DIR" "$LOCAL_DIR/$root_file" >> "$CMD_FILE"
  else
    echo "Skipping missing root file: $LOCAL_DIR/$root_file" >&2
  fi
done
echo "bye" >> "$CMD_FILE"

if [[ "${DEPLOY_SFTP_DRYRUN:-0}" == "1" ]]; then
  echo "--- lftp command plan ---"
  cat "$CMD_FILE"
  exit 0
fi

if [[ -n "${DEPLOY_SFTP_VERBOSE:-}" ]]; then
  echo "--- lftp command plan ---"
  cat "$CMD_FILE"
fi

lftp -f "$CMD_FILE"
