#!/usr/bin/env bash
#
# 임베딩(embeddings) 호출 예제. 텍스트를 벡터로 변환합니다.
#
# 실행:
#   bash 04_embeddings.sh
#
set -euo pipefail

source "$(dirname "$0")/../.env"

curl -s "${AIHUB_BASE_URL}/embeddings" \
  -H "Authorization: Bearer ${AIHUB_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "text-embedding-3-large",
    "input": "가비아 AI 허브"
  }'
