#!/usr/bin/env bash
set -euo pipefail

SITE_SERVICE="electron-rare-site"
TRAEFIK_SERVICE="zacus-traefik"
COMPOSE_FILE="/root/electron-rare-site/infra/docker-compose.site.yml"
LOG_DIR="/root/electron-rare-site/artifacts/ops"
LOG_FILE="$LOG_DIR/site-ops-tui.log"
DOMAIN="${DOMAIN:-https://www.lelectronrare.fr}"
SITE_BASE_PATH="${SITE_BASE_PATH:-}"
API_ENDPOINT="${API_ENDPOINT:-${DOMAIN}${SITE_BASE_PATH}/api/submit-lead}"

mkdir -p "$LOG_DIR"

log() {
  echo "$(date -Iseconds) $*" | tee -a "$LOG_FILE"
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Missing command: $1" >&2
    exit 1
  }
}

status_panel() {
  log "STATUS: check docker services"
  docker compose -f "$COMPOSE_FILE" ps --services --filter "name=$SITE_SERVICE" | xargs -r -I{} docker compose -f "$COMPOSE_FILE" ps {}
  log "STATUS: service inspect"
  docker inspect -f 'service={{.Name}} status={{.State.Status}} health={{if .State.Health}}{{.State.Health.Status}}{{else}}n/a{{end}}' "$SITE_SERVICE" "$TRAEFIK_SERVICE" 2>/dev/null || true
}

endpoint_panel() {
  log "HTTP checks for $DOMAIN"
  for path in "" "/404" "/mentions-legales"; do
    code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 6 "$DOMAIN$path" || true)
    log "GET $path => $code"
    echo "GET $path => $code"
  done
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 8 -X POST "$API_ENDPOINT" \
    -H 'Content-Type: application/json' \
    -d '{"name":"ops-test","email":"ops@test.lelectronrare.fr","needType":"technique","sourceChannel":"site","sourceDetail":"ops_health","consent":true}' || true)
  log "POST $API_ENDPOINT => $code"
  echo "POST $API_ENDPOINT => $code"
}

analyze_logs() {
  log "LOG ANALYSE: $LOG_FILE"
  if [ ! -f "$LOG_FILE" ]; then
    echo "Aucun log local: $LOG_FILE"
    return
  fi
  total=$(wc -l < "$LOG_FILE")
  errors=$(grep -ciE 'error|fatal|exception|traceback' "$LOG_FILE" || true)
  warn=$(grep -ciE 'warn|warn:' "$LOG_FILE" || true)
  echo "Total lignes: $total"
  echo "Lignes erreur: $errors"
  echo "Lignes warn: $warn"
  if [ "$errors" -gt 0 ]; then
    echo "--- top erreurs ---"
    grep -niE 'error|fatal|exception|traceback' "$LOG_FILE" | head -n 20
  fi
}

logs_panel() {
  log "TAIL logs: $SITE_SERVICE (40 lines)"
  docker logs --tail 40 "$SITE_SERVICE" | tee -a "$LOG_FILE"
  echo "---"
  log "TAIL logs: $TRAEFIK_SERVICE (40 lines)"
  docker logs --tail 40 "$TRAEFIK_SERVICE" | tee -a "$LOG_FILE"
}

cleanup_logs() {
  local keep_days="${1:-7}"
  log "CLEANUP: docker json logs if writable"
  for svc in "$SITE_SERVICE" "$TRAEFIK_SERVICE"; do
    logpath=$(docker inspect -f '{{.LogPath}}' "$svc" 2>/dev/null || true)
    if [ -n "$logpath" ] && [ -f "$logpath" ]; then
      : > "$logpath"
      log "truncated $logpath for $svc"
    else
      log "no log file for $svc"
    fi
  done

  if [ -d "$LOG_DIR" ]; then
    find "$LOG_DIR" -type f -name "*.log" -mtime +"$keep_days" -print -delete | while IFS= read -r removed; do
      log "deleted old local artifact log: $removed"
    done
  fi
  log "CLEANUP complete (keep $keep_days days)"
}

menu() {
  echo "1) status"
  echo "2) logs"
  echo "3) endpoints"
  echo "4) cleanup"
  echo "5) full"
  echo "6) analyze logs"
  echo "0) quit"
  read -r -p "choix: " choice
  case "$choice" in
    1) status_panel ;;
    2) logs_panel ;;
    3) endpoint_panel ;;
    4) read -r -p "jours a garder [7]: " days; cleanup_logs "${days:-7}" ;;
    5) status_panel; logs_panel; endpoint_panel ;;
    6) analyze_logs ;;
    *) exit 0 ;;
  esac
}

case "${1:-menu}" in
  status)
    require_cmd docker
    status_panel
    ;;
  logs)
    require_cmd docker
    logs_panel
    ;;
  endpoint*|http)
    require_cmd curl
    endpoint_panel
    ;;
  cleanup)
    require_cmd docker
    cleanup_logs "${2:-7}"
    ;;
  run)
    require_cmd docker
    require_cmd curl
    status_panel
    logs_panel
    endpoint_panel
    ;;
  menu|*)
    menu
    ;;
esac
