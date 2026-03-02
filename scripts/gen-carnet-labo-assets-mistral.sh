#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TODAY="$(date +%F)"
BATCH_FILE="${1:-$ROOT_DIR/tmp/imagegen/mistral/carnet-labo-assets-v2.jsonl}"
OUTPUT_DIR="${OUTPUT_DIR:-$ROOT_DIR/output/imagegen/mistral/carnet-labo-assets-v2}"
REPORT_FILE="${REPORT_FILE:-$ROOT_DIR/artifacts/imagegen/$TODAY/asset-run-report.md}"

MISTRAL_IMAGES_ENDPOINT="https://api.mistral.ai/v1/images/generations"
MISTRAL_CONVERSATIONS_ENDPOINT="https://api.mistral.ai/v1/conversations"
MISTRAL_AGENTS_ENDPOINT="https://api.mistral.ai/v1/agents"
MISTRAL_FILES_ENDPOINT="https://api.mistral.ai/v1/files"
MISTRAL_MODELS_ENDPOINT="https://api.mistral.ai/v1/models"
ENV_FILE="$ROOT_DIR/tmp/imagegen/.env.mistral"
AGENT_CACHE_FILE="$ROOT_DIR/tmp/imagegen/.mistral-image-agent.id"

if [[ -f "$ENV_FILE" ]]; then
  # shellcheck disable=SC1090
  source "$ENV_FILE"
fi

MODEL="${MISTRAL_IMAGE_MODEL:-mistral-medium-2505}"
AGENT_ID="${MISTRAL_IMAGE_AGENT_ID:-}"

mkdir -p "$OUTPUT_DIR" "$(dirname "$REPORT_FILE")"

if [[ "${1-}" == "--list-models" ]]; then
  if [[ -z "${MISTRAL_API_KEY:-}" ]]; then
    echo "MISTRAL_API_KEY is required."
    exit 1
  fi
  curl -sS "$MISTRAL_MODELS_ENDPOINT" \
    -H "Authorization: Bearer $MISTRAL_API_KEY" \
    -H "Content-Type: application/json" | jq .
  exit 0
fi

if [[ "${1-}" == "--reset-agent" ]]; then
  rm -f "$AGENT_CACHE_FILE"
  shift || true
  BATCH_FILE="${1:-$ROOT_DIR/tmp/imagegen/mistral/carnet-labo-assets-v2.jsonl}"
fi

if [[ -z "${MISTRAL_API_KEY:-}" ]]; then
  echo "MISTRAL_API_KEY is required."
  exit 1
fi

if [[ ! -f "$BATCH_FILE" ]]; then
  echo "Missing batch file: $BATCH_FILE"
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required."
  exit 1
fi

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required."
  exit 1
fi

echo "# Asset Run Report ($TODAY)" > "$REPORT_FILE"
echo >> "$REPORT_FILE"
echo "- Batch: \`$BATCH_FILE\`" >> "$REPORT_FILE"
echo "- Output: \`$OUTPUT_DIR\`" >> "$REPORT_FILE"
echo "- Model: \`$MODEL\`" >> "$REPORT_FILE"
echo >> "$REPORT_FILE"
echo "| Asset | Provider | Status | Note |" >> "$REPORT_FILE"
echo "|---|---|---|---|" >> "$REPORT_FILE"

log_report() {
  local asset="$1"
  local provider="$2"
  local status="$3"
  local note="$4"
  echo "| $asset | $provider | $status | $note |" >> "$REPORT_FILE"
}

post_json() {
  local url="$1"
  local payload="$2"
  local out_file="$3"
  local http_code

  http_code="$(curl -sS -o "$out_file" -w "%{http_code}" -X POST "$url" \
    -H "Authorization: Bearer $MISTRAL_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$payload")"

  echo "$http_code"
}

extract_file_ids_from_conversation() {
  local json_file="$1"
  jq -r '
    .outputs // [] |
    map(select(.type == "message.output")) |
    .[].content // [] |
    map(select(.type == "tool_file" and .file_id != null and .file_id != "")) |
    .[].file_id
  ' "$json_file" 2>/dev/null | tr -d "\\r" | sed "/^$/d"
}

extract_first_image_url() {
  local json_file="$1"
  jq -r '.data[0].url // empty' "$json_file" 2>/dev/null
}

ensure_agent() {
  if [[ -n "$AGENT_ID" ]]; then
    return 0
  fi

  if [[ -f "$AGENT_CACHE_FILE" ]]; then
    local cached
    cached="$(tr -d '[:space:]' < "$AGENT_CACHE_FILE")"
    if [[ -n "$cached" ]]; then
      AGENT_ID="$cached"
      return 0
    fi
  fi

  local payload tmpfile http_code
  payload="$(jq -nc \
    --arg model "$MODEL" \
    '{model:$model,name:"Image Generation Agent",description:"Image generation fallback agent",instructions:"Use image_generation for image requests.",tools:[{type:"image_generation"}]}')"
  tmpfile="$(mktemp)"
  http_code="$(post_json "$MISTRAL_AGENTS_ENDPOINT" "$payload" "$tmpfile")"

  if [[ "$http_code" != 2* ]] || jq -e '.error' "$tmpfile" >/dev/null 2>&1; then
    echo "Unable to create Mistral fallback agent."
    cat "$tmpfile"
    rm -f "$tmpfile"
    return 1
  fi

  AGENT_ID="$(jq -r '.id // empty' "$tmpfile")"
  rm -f "$tmpfile"
  if [[ -z "$AGENT_ID" ]]; then
    return 1
  fi

  echo "$AGENT_ID" > "$AGENT_CACHE_FILE"
  export MISTRAL_IMAGE_AGENT_ID="$AGENT_ID"
}

copy_from_local_fallback() {
  local out="$1"
  local target="$2"
  local cache1="$ROOT_DIR/output/imagegen/openai/carnet-labo-assets-v1/$out"
  local cache2="$ROOT_DIR/public/assets/da/openai/$out"

  if [[ -f "$cache1" ]]; then
    cp "$cache1" "$target"
    return 0
  fi

  if [[ -f "$cache2" ]]; then
    cp "$cache2" "$target"
    return 0
  fi

  return 1
}

download_mistral_file_id() {
  local file_id="$1"
  local target="$2"

  curl -L -sS "$MISTRAL_FILES_ENDPOINT/$file_id/content" \
    -H "Authorization: Bearer $MISTRAL_API_KEY" \
    -o "$target"
}

generate_with_images_api() {
  local prompt="$1"
  local size="$2"
  local out_tmp="$3"
  local payload

  payload="$(jq -nc --arg model "$MODEL" --arg prompt "$prompt" --arg size "$size" '{model:$model,prompt:$prompt,n:1,size:$size}')"
  post_json "$MISTRAL_IMAGES_ENDPOINT" "$payload" "$out_tmp"
}

generate_with_agent_api() {
  local prompt="$1"
  local out_tmp="$2"
  local payload

  ensure_agent || return 1
  payload="$(jq -nc --arg agent_id "$AGENT_ID" --arg prompt "$prompt" '{agent_id:$agent_id,inputs:$prompt,stream:false}')"
  post_json "$MISTRAL_CONVERSATIONS_ENDPOINT" "$payload" "$out_tmp"
}

echo "Backend: Mistral image generation"
echo "Model: $MODEL"
echo "Batch: $BATCH_FILE"
echo "Output: $OUTPUT_DIR"
echo "Report: $REPORT_FILE"
echo

tmpfile="$(mktemp)"
trap 'rm -f "$tmpfile"' EXIT

success_count=0
fallback_count=0
error_count=0

while IFS= read -r line; do
  [[ -z "$line" ]] && continue

  out="$(echo "$line" | jq -r '.out // ""')"
  prompt="$(echo "$line" | jq -r '.prompt // ""')"
  size="$(echo "$line" | jq -r '.size // "1024x1024"')"
  guardrails="$(echo "$line" | jq -r '.style_guardrails // ""')"
  target="$OUTPUT_DIR/$out"

  if [[ -z "$out" || -z "$prompt" ]]; then
    continue
  fi

  case "$size" in
    256x256|512x512|1024x1024) ;;
    *) size="1024x1024" ;;
  esac

  if [[ -n "$guardrails" ]]; then
    prompt="$prompt Constraints: $guardrails"
  fi

  if [[ -f "$target" ]]; then
    log_report "$out" "cache-output" "ok" "already exists"
    ((success_count+=1))
    continue
  fi

  provider=""
  status="failed"
  note=""

  # Stage 1: images/generations with exponential retry on 503
  for attempt in 1 2 3 4; do
    http_code="$(generate_with_images_api "$prompt" "$size" "$tmpfile")"

    if [[ "$http_code" == "503" ]]; then
      sleep $((2 ** (attempt - 1)))
      continue
    fi

    if [[ "$http_code" == 2* ]] && ! jq -e '.error' "$tmpfile" >/dev/null 2>&1; then
      url="$(extract_first_image_url "$tmpfile")"
      if [[ -n "$url" ]]; then
        if curl -L -sS "$url" -o "$target"; then
          provider="mistral-images"
          status="ok"
          note="generated via /v1/images/generations"
        fi
      fi
    fi
    break
  done

  # Stage 2: fallback to agent/conversations
  if [[ "$status" != "ok" ]]; then
    for attempt in 1 2 3 4; do
      http_code="$(generate_with_agent_api "$prompt" "$tmpfile" || echo "000")"
      if [[ "$http_code" == "503" ]]; then
        sleep $((2 ** (attempt - 1)))
        continue
      fi

      if [[ "$http_code" == 2* ]] && ! jq -e '.error' "$tmpfile" >/dev/null 2>&1; then
        file_id="$(extract_file_ids_from_conversation "$tmpfile" | head -n 1)"
        if [[ -n "$file_id" ]]; then
          if download_mistral_file_id "$file_id" "$target"; then
            provider="mistral-agent"
            status="ok"
            note="generated via /v1/conversations fallback"
          fi
        fi
      fi
      break
    done
  fi

  # Stage 3: fallback to local cache
  if [[ "$status" != "ok" ]]; then
    if copy_from_local_fallback "$out" "$target"; then
      provider="local-cache"
      status="ok"
      note="fallback from openai/public cache"
      ((fallback_count+=1))
    else
      provider="none"
      status="failed"
      note="no provider available"
      ((error_count+=1))
    fi
  fi

  if [[ "$status" == "ok" ]]; then
    ((success_count+=1))
  fi
  log_report "$out" "$provider" "$status" "$note"
  echo "$status: $out ($provider)"
done < "$BATCH_FILE"

echo >> "$REPORT_FILE"
echo "- Success: $success_count" >> "$REPORT_FILE"
echo "- Local-cache fallback: $fallback_count" >> "$REPORT_FILE"
echo "- Errors: $error_count" >> "$REPORT_FILE"

if (( error_count > 0 )); then
  echo "Completed with errors. See $REPORT_FILE"
  exit 1
fi

echo "Done. Report: $REPORT_FILE"
