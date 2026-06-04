"""사용 가능한 모델 목록 조회.

가비아 AI 허브에 등록된 모델 목록을 반환합니다.
예제 코드에 모델명을 직접 적기 전에, 먼저 이걸로 확인하세요.

참고: /v1/models 응답의 모델명 필드는 OpenAI 표준의 "id" 가 아니라
"model_name" 입니다. 그래서 이 예제만 OpenAI SDK 대신 HTTP 로 직접 조회합니다.

실행:
    python 02_list_models.py
"""

import os

import httpx
from dotenv import load_dotenv

load_dotenv()

response = httpx.get(
    f"{os.environ['AIHUB_BASE_URL']}/models",
    headers={"Authorization": f"Bearer {os.environ['AIHUB_API_KEY']}"},
)
response.raise_for_status()

for model in response.json()["data"]:
    print(model["model_name"])
