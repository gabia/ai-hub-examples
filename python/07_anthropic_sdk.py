"""Anthropic SDK 로 호출하는 예제.

OpenAI SDK 뿐 아니라, 기존 Anthropic SDK 코드도 base_url 만 바꾸면
가비아 AI 허브로 그대로 붙습니다. (/v1/messages 로 라우팅)

주의: Anthropic SDK 는 내부적으로 /v1/messages 를 붙이므로
base_url 에는 /v1 을 제외한 호스트만 넣습니다.

실행:
    python 07_anthropic_sdk.py
"""

import os

from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()

client = Anthropic(
    api_key=os.environ["AIHUB_API_KEY"],
    base_url="https://ai-hub.gabia.com",  # /v1 제외
)

message = client.messages.create(
    # /v1/messages 는 Claude 계열 모델을 사용합니다. "-latest" 는 항상 최신 Claude 입니다.
    model="claude-sonnet-latest",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "안녕하세요. 짧게 인사해주세요."},
    ],
)

print(message.content[0].text)
