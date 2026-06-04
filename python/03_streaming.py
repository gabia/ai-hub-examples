"""스트리밍 응답 예제.

stream=True 로 두면 토큰이 생성되는 대로 실시간 수신합니다.
챗봇 UI 처럼 타이핑 효과를 줄 때 사용합니다.

실행:
    python 03_streaming.py
"""

import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.environ["AIHUB_API_KEY"],
    base_url=os.environ["AIHUB_BASE_URL"],
)

stream = client.chat.completions.create(
    model="gpt-latest",
    messages=[
        {"role": "user", "content": "AI Gateway가 왜 필요한지 3줄로 설명해줘."},
    ],
    stream=True,
)

for chunk in stream:
    # 마지막 usage 청크 등 choices 가 빈 청크가 올 수 있어 먼저 방어합니다.
    if not chunk.choices:
        continue
    delta = chunk.choices[0].delta.content
    if delta:
        print(delta, end="", flush=True)
print()
