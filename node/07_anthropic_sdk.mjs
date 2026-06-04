/**
 * Anthropic SDK 로 호출하는 예제.
 *
 * OpenAI SDK 뿐 아니라, 기존 Anthropic SDK 코드도 baseURL 만 바꾸면
 * 가비아 AI 허브로 그대로 붙습니다. (/v1/messages 로 라우팅)
 *
 * 주의: Anthropic SDK 는 내부적으로 /v1/messages 를 붙이므로
 * baseURL 에는 /v1 을 제외한 호스트만 넣습니다.
 *
 * 실행:
 *   node 07_anthropic_sdk.mjs
 */

import { config } from "dotenv";
config({ path: new URL("../.env", import.meta.url).pathname }); // 어느 위치에서 실행해도 루트 .env 를 읽습니다.
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.AIHUB_API_KEY,
  baseURL: "https://ai-hub.gabia.com", // /v1 제외
});

const message = await client.messages.create({
  // /v1/messages 는 Claude 계열 모델을 사용합니다. "-latest" 는 항상 최신 Claude 입니다.
  model: "claude-sonnet-latest",
  max_tokens: 1024,
  messages: [{ role: "user", content: "안녕하세요. 짧게 인사해주세요." }],
});

console.log(message.content[0].text);
