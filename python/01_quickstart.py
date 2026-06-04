"""가장 단순한 호출 예제.

기존 OpenAI 코드에서 base_url 한 줄만 추가하면 됩니다.

실행:
    pip install -r requirements.txt
    python 01_quickstart.py
"""

import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.environ["AIHUB_API_KEY"],
    base_url=os.environ["AIHUB_BASE_URL"],  # https://ai-hub.gabia.com/v1
)

response = client.chat.completions.create(
    # 모델명은 코드에 직접 적습니다. "-latest" 별칭은 항상 최신 버전을 가리킵니다.
    # 사용 가능한 전체 모델 목록은 02_list_models.py 로 확인하세요.
    model="gpt-latest",
    messages=[
        {"role": "user", "content": "가비아 AI 허브를 한 문장으로 소개해줘."},
    ],
)

print(response.choices[0].message.content)
