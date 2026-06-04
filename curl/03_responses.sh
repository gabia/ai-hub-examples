#!/usr/bin/env bash
#
# Responses API (OpenAI) 호출 예제. messages 배열 대신 input 하나로 호출합니다.
#
# 실행:
#   bash 03_responses.sh
#
set -euo pipefail

source "$(dirname "$0")/../.env"

curl -s "${AIHUB_BASE_URL}/responses" \
  -H "Authorization: Bearer ${AIHUB_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-latest",
    "input": "가비아 AI 허브를 한 문장으로 소개해줘."
  }'
