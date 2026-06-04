#!/usr/bin/env bash
#
# Anthropic Messages API 호출 예제. Claude 계열 모델을 사용합니다.
#
# - Anthropic 표준대로 x-api-key / anthropic-version 헤더를 사용합니다.
#   (Authorization: Bearer 헤더도 동일하게 지원됩니다.)
# - max_tokens 는 Messages API 필수 항목입니다.
#
# 실행:
#   bash 05_messages_anthropic.sh
#
set -euo pipefail

source "$(dirname "$0")/../.env"

curl -s "${AIHUB_BASE_URL}/messages" \
  -H "x-api-key: ${AIHUB_API_KEY}" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-sonnet-latest",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "안녕하세요. 짧게 인사해주세요."}
    ]
  }'
