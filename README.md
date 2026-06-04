# 가비아 AI 허브 사용 예제

> **가비아 AI 허브 공식 페이지:** https://aihub.gabiacloud.com/
>
> **API Key 발급:** 가비아 클라우드(Gen2) 가입 → AI 허브 신청 → 콘솔에서 발급

## AI 허브란?

여러 AI 모델(OpenAI, Anthropic, Google, DeepSeek 등)을 **하나의 API Key·하나의 엔드포인트**로 사용할 수 있는 AI API Gateway입니다.

가장 큰 장점은 **기존에 쓰던 SDK를 그대로 쓸 수 있다**는 점입니다. OpenAI SDK든 Anthropic SDK든, `base_url` 만 가비아 AI 허브로 바꾸면 됩니다.

```python
# Before — OpenAI 직접 호출
client = OpenAI(api_key="sk-...")

# After — 가비아 AI 허브 (base_url 한 줄만 추가)
client = OpenAI(
    api_key="발급받은_가비아_키",            # sk- 로 시작
    base_url="https://ai-hub.gabia.com/v1",  # 이 줄만 추가
)
```

## 목차

- [시작하기](#시작하기)
- [Quickstart](#quickstart)
- [인증](#인증)
- [모델 선택](#모델-선택)
- [지원 엔드포인트](#지원-엔드포인트)
- [예제 목록](#예제-목록)
- [SDK 없이 호출하기 (curl)](#sdk-없이-호출하기-curl)
- [에러 처리](#에러-처리)
- [라이선스](#라이선스)

## 시작하기

### 1. API Key 발급

가비아 AI 허브 콘솔에서 API Key를 발급받습니다. (키는 `sk-` 로 시작합니다.)

### 2. 환경 변수 설정

키와 엔드포인트만 환경 변수로 둡니다. **모델명은 예제 코드 안에 직접 적습니다.**

```bash
cp .env.example .env
# .env 파일을 열어 AIHUB_API_KEY 를 발급받은 키로 채웁니다.
```

| 변수 | 설명 | 값 |
| --- | --- | --- |
| `AIHUB_API_KEY` | 발급받은 API Key | `sk-...` |
| `AIHUB_BASE_URL` | OpenAI 호환 엔드포인트 | `https://ai-hub.gabia.com/v1` |

### 3. 설치하고 실행하기

```bash
# Python
cd python && pip install -r requirements.txt
python 01_quickstart.py

# Node.js (Node 18+)
cd node && npm install
node 01_quickstart.mjs
```

예제는 어느 위치에서 실행해도 루트의 `.env` 를 읽습니다.

## Quickstart

```python
# python/01_quickstart.py
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()  # .env 에서 키와 base URL 을 읽어옵니다.

client = OpenAI(
    api_key=os.environ["AIHUB_API_KEY"],
    base_url=os.environ["AIHUB_BASE_URL"],  # https://ai-hub.gabia.com/v1
)

response = client.chat.completions.create(
    model="gpt-latest",  # 사용 가능한 모델은 GET /v1/models 로 확인
    messages=[{"role": "user", "content": "가비아 AI 허브를 한 문장으로 소개해줘."}],
)
print(response.choices[0].message.content)
```

```javascript
// node/01_quickstart.mjs
import "dotenv/config"; // .env 에서 키와 base URL 을 읽어옵니다.
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.AIHUB_API_KEY,
  baseURL: process.env.AIHUB_BASE_URL, // https://ai-hub.gabia.com/v1
});

const response = await client.chat.completions.create({
  model: "gpt-latest",
  messages: [{ role: "user", content: "가비아 AI 허브를 한 문장으로 소개해줘." }],
});
console.log(response.choices[0].message.content);
```

## 인증

요청 헤더는 OpenAI 표준과 동일합니다. SDK를 쓰면 자동으로 처리됩니다.

```
Authorization: Bearer sk-...
```

Anthropic SDK 처럼 `x-api-key` 헤더로 키를 보내는 클라이언트도 그대로 지원합니다.

```
x-api-key: sk-...
```

## 모델 선택

모델명은 `.env` 가 아니라 **예제 코드 안에 직접** 적습니다(OpenAI·Anthropic SDK 공식 예제와 동일한 방식).

모델은 두 가지 형태로 지정할 수 있습니다.

| 형태 | 예시 | 특징 |
| --- | --- | --- |
| **`-latest` 별칭** | `gpt-latest`, `claude-sonnet-latest`, `gemini-pro-latest` | 항상 최신 버전을 가리킵니다. 모델이 올라가도 코드를 고칠 필요가 없습니다. |
| **버전 고정** | `gpt-5.5`, `claude-opus-4.6`, `gemini-2.5-pro` | 응답을 특정 버전에 고정합니다. 재현성이 중요할 때 사용합니다. |

> 위 모델명은 예시이며, 전체 목록은 `GET /v1/models`(`02_list_models` 예제)로 확인하세요.

OpenAI · Anthropic · Google · DeepSeek 등 여러 제공사의 LLM과 임베딩 모델을 지원합니다.

## 지원 엔드포인트

| 엔드포인트 | 설명 | 호환 SDK |
| --- | --- | --- |
| `POST /v1/chat/completions` | Chat Completions | OpenAI |
| `POST /v1/responses` | Responses API | OpenAI |
| `POST /v1/embeddings` | 임베딩 | OpenAI |
| `POST /v1/messages` | Messages API | Anthropic |
| `GET /v1/models` | 사용 가능한 모델 목록 | OpenAI |

## 예제 목록

Python·Node 동일한 번호로 같은 주제를 다룹니다.

| 번호 | 주제 | Python | Node.js |
| --- | --- | --- | --- |
| 01 | Quickstart (chat/completions) | `python/01_quickstart.py` | `node/01_quickstart.mjs` |
| 02 | 모델 목록 조회 | `python/02_list_models.py` | `node/02_list_models.mjs` |
| 03 | 스트리밍 | `python/03_streaming.py` | `node/03_streaming.mjs` |
| 04 | Function calling | `python/04_function_calling.py` | `node/04_function_calling.mjs` |
| 05 | Responses API | `python/05_responses.py` | `node/05_responses.mjs` |
| 06 | 임베딩 | `python/06_embeddings.py` | `node/06_embeddings.mjs` |
| 07 | Anthropic SDK (messages) | `python/07_anthropic_sdk.py` | `node/07_anthropic_sdk.mjs` |

> 처음이라면 `02` 로 현재 어떤 모델이 있는지 둘러보세요.

## SDK 없이 호출하기 (curl)

SDK 없이 HTTP로 직접 호출할 수도 있습니다. [`curl/`](./curl) 디렉터리에 엔드포인트별 예제가 있습니다.

```bash
curl https://ai-hub.gabia.com/v1/chat/completions \
  -H "Authorization: Bearer $AIHUB_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-latest",
    "messages": [{"role": "user", "content": "안녕하세요"}]
  }'
```

## 에러 처리

가비아 AI 허브는 OpenAI 호환 에러 형식을 따릅니다. 인증 실패는 `401`, 잘못된 요청은 `400` 입니다.

추가로 **팀 단위 사용 예산**을 관리합니다. 한도를 초과하면 `429 Too Many Requests` 와 함께 어떤 한도를 얼마나 초과했는지 본문으로 알려줍니다.

```json
{
  "error_code": "BUDGET_EXCEEDED",
  "error_message": "...",
  "budget_detail": {
    "target_type": "team",
    "period": "monthly",
    "limit_amount": 100000,
    "used_amount": 100500,
    "period_start": "2026-06-01T00:00:00.000Z"
  }
}
```

실제 서비스에서는 `429` 응답을 받았을 때 `budget_detail` 을 확인해 사용자에게 안내하거나 재시도 로직을 조정하세요.

## 라이선스

[MIT](./LICENSE)
