/**
 * Responses API 예제.
 *
 * OpenAI 의 최신 Responses API 입니다. chat/completions 와 달리 messages 배열 대신
 * input 하나로 간단히 호출하고, 대화 상태를 서버가 이어줄 수 있습니다.
 *
 * baseURL 은 chat/completions 예제와 동일하게 그대로 두면 됩니다.
 * (OpenAI SDK 가 내부적으로 /v1/responses 로 라우팅)
 *
 * 실행:
 *   node 05_responses.mjs
 */

import { config } from "dotenv";
config({ path: new URL("../.env", import.meta.url).pathname }); // 어느 위치에서 실행해도 루트 .env 를 읽습니다.
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.AIHUB_API_KEY,
  baseURL: process.env.AIHUB_BASE_URL,
});

const response = await client.responses.create({
  model: "gpt-latest",
  input: "가비아 AI 허브를 한 문장으로 소개해줘.",
});

// output_text 는 응답 텍스트만 모아주는 편의 속성입니다.
console.log(response.output_text);
