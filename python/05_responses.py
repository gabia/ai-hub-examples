"""Responses API 예제.

OpenAI 의 최신 Responses API 입니다. chat/completions 와 달리 messages 배열 대신
input 하나로 간단히 호출하고, 대화 상태를 서버가 이어줄 수 있습니다.

base_url 은 chat/completions 예제와 동일하게 그대로 두면 됩니다.
(OpenAI SDK 가 내부적으로 /v1/responses 로 라우팅)

실행:
    python 05_responses.py
"""

import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.environ["AIHUB_API_KEY"],
    base_url=os.environ["AIHUB_BASE_URL"],
)

response = client.responses.create(
    model="gpt-latest",
    input="가비아 AI 허브를 한 문장으로 소개해줘.",
)

# output_text 는 응답 텍스트만 모아주는 편의 속성입니다.
print(response.output_text)
