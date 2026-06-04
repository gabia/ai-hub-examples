"""Function calling (tool use) 예제.

모델이 직접 답하는 대신 "이 함수를 이런 인자로 호출해줘" 라고 요청하면,
애플리케이션이 실제 함수를 실행하고 결과를 다시 모델에 전달합니다.

실행:
    python 04_function_calling.py
"""

import json
import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.environ["AIHUB_API_KEY"],
    base_url=os.environ["AIHUB_BASE_URL"],
)

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "특정 도시의 현재 날씨를 조회한다.",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "도시 이름, 예: 서울"},
                },
                "required": ["city"],
            },
        },
    }
]


def get_weather(city: str) -> str:
    """실제 서비스라면 외부 날씨 API를 호출합니다. 여기서는 더미 값."""
    return json.dumps({"city": city, "temperature": "23도", "condition": "맑음"})


messages = [{"role": "user", "content": "서울 날씨 어때?"}]

# 1단계: 모델이 어떤 함수를 호출할지 결정
first = client.chat.completions.create(
    model="gpt-latest",
    messages=messages,
    tools=tools,
)
message = first.choices[0].message
messages.append(message)

# 2단계: 모델이 요청한 함수를 실제로 실행
for tool_call in message.tool_calls or []:
    args = json.loads(tool_call.function.arguments)
    result = get_weather(**args)
    messages.append(
        {
            "role": "tool",
            "tool_call_id": tool_call.id,
            "content": result,
        }
    )

# 3단계: 함수 결과를 넣어 최종 답변 생성
second = client.chat.completions.create(
    model="gpt-latest",
    messages=messages,
)
print(second.choices[0].message.content)
