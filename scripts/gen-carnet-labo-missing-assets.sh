#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
"$SCRIPT_DIR/gen-carnet-labo-assets-mistral.sh" "${SCRIPT_DIR}/../tmp/imagegen/mistral/carnet-labo-assets-v2.jsonl"
