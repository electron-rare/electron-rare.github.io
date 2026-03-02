#!/usr/bin/env bash

set -euo pipefail

LOCAL_DIR="${1:-dist}"
FTP_URL="${FTP_URL:-}"
FTP_HOST="${FTP_HOST:-ftp.cluster129.hosting.ovh.net}"
FTP_USER="${FTP_USER:-ecobsoleiq}"
FTP_PORT="${FTP_PORT:-21}"
FTP_REMOTE_DIR="${FTP_REMOTE_DIR:-/www}"
FTP_ENV_FILE="${FTP_ENV_FILE:-.env.ftp}"
FTP_PASS="${FTP_PASS:-}"

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
  if [[ "$FTP_URL" =~ ^ftp://([^@:/]+)@([^:/]+)(:([0-9]+))?(/.*)?$ ]]; then
    FTP_USER="${BASH_REMATCH[1]}"
    FTP_HOST="${BASH_REMATCH[2]}"
    FTP_PORT="${BASH_REMATCH[4]:-$FTP_PORT}"
    if [[ -n "${BASH_REMATCH[5]:-}" ]]; then
      FTP_REMOTE_DIR="${BASH_REMATCH[5]}"
    fi
  else
    echo "Invalid FTP_URL format. Expected ftp://user@host:21/path"
    exit 1
  fi
fi

if [[ -z "$FTP_REMOTE_DIR" ]]; then
  FTP_REMOTE_DIR="/www"
fi

if [[ "$FTP_REMOTE_DIR" != /* ]]; then
  FTP_REMOTE_DIR="/$FTP_REMOTE_DIR"
fi

if [[ "$FTP_REMOTE_DIR" == "/" && "${ALLOW_FTP_ROOT_SYNC:-0}" != "1" ]]; then
  echo "Refusing FTP sync to '/'."
  echo "Set FTP_REMOTE_DIR='/www' (recommended for OVH web hosting)."
  echo "If you really need root sync, set ALLOW_FTP_ROOT_SYNC=1."
  exit 1
fi

if [[ ! -d "$LOCAL_DIR" ]]; then
  echo "Local directory not found: $LOCAL_DIR"
  exit 1
fi

if ! command -v lftp >/dev/null 2>&1; then
  echo "lftp is required. Install via: brew install lftp | apt-get install lftp"
  exit 1
fi

cat <<EOF | lftp -u "$FTP_USER","$FTP_PASS" "$FTP_HOST"
    set ftp:list-options -a;
    set cmd:fail-exit true;
    set net:max-retries 2;
set net:timeout 30;
set mirror:use-pget-n 4;
mirror --reverse --delete \
  --dereference \
  --continue \
  --verbose \
  "$LOCAL_DIR" "$FTP_REMOTE_DIR"
bye
EOF
