#!/usr/bin/env bash
#
# Chat Completions (OpenAI 호환) 호출 예제.
#
# 실행:
#   bash 01_chat_completions.sh
#
set -euo pipefail

# 루트 .env 에서 AIHUB_API_KEY / AIHUB_BASE_URL 을 읽어옵니다.
source "$(dirname "$0")/../.env"

curl -s "${AIHUB_BASE_URL}/chat/completions" \
  -H "Authorization: Bearer ${AIHUB_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-latest",
    "messages": [
      {"role": "user", "content": "가비아 AI 허브를 한 문장으로 소개해줘."}
    ]
  }'
