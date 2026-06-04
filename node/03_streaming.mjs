/**
 * 스트리밍 응답 예제.
 *
 * stream: true 로 두면 토큰이 생성되는 대로 실시간 수신합니다.
 * 챗봇 UI 처럼 타이핑 효과를 줄 때 사용합니다.
 *
 * 실행:
 *   node 03_streaming.mjs
 */

import { config } from "dotenv";
config({ path: new URL("../.env", import.meta.url).pathname }); // 어느 위치에서 실행해도 루트 .env 를 읽습니다.
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.AIHUB_API_KEY,
  baseURL: process.env.AIHUB_BASE_URL,
});

const stream = await client.chat.completions.create({
  model: "gpt-latest",
  messages: [
    { role: "user", content: "AI Gateway가 왜 필요한지 3줄로 설명해줘." },
  ],
  stream: true,
});

for await (const chunk of stream) {
  const delta = chunk.choices[0]?.delta?.content;
  if (delta) process.stdout.write(delta);
}
process.stdout.write("\n");
