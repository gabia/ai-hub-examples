# curl 예제

SDK 없이 HTTP로 직접 가비아 AI 허브를 호출하는 예제입니다.

## 준비

루트의 `.env` 를 그대로 사용합니다. (`AIHUB_API_KEY`, `AIHUB_BASE_URL`)

```bash
cp ../.env.example ../.env
# ../.env 에 발급받은 키를 채웁니다.
```

각 스크립트는 실행 시 `../.env` 를 읽습니다.

```bash
bash 01_chat_completions.sh
```

## 예제 목록

| 파일 | 엔드포인트 |
| --- | --- |
| `01_chat_completions.sh` | `POST /v1/chat/completions` |
| `02_list_models.sh` | `GET /v1/models` |
| `03_responses.sh` | `POST /v1/responses` |
| `04_embeddings.sh` | `POST /v1/embeddings` |
| `05_messages_anthropic.sh` | `POST /v1/messages` (Anthropic) |
