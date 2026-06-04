#!/usr/bin/env bash
#
# 가비아 AI 허브에 등록된 사용 가능한 모델 목록을 조회합니다.
# 응답 JSON 의 각 항목에서 "model_name" 필드가 모델명입니다.
#
# 실행:
#   bash 02_list_models.sh
#   bash 02_list_models.sh | python3 -c "import sys,json;[print(m['model_name']) for m in json.load(sys.stdin)['data']]"
#
set -euo pipefail

source "$(dirname "$0")/../.env"

curl -s "${AIHUB_BASE_URL}/models" \
  -H "Authorization: Bearer ${AIHUB_API_KEY}"
