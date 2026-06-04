/**
 * 가장 단순한 호출 예제.
 *
 * 기존 OpenAI 코드에서 baseURL 한 줄만 추가하면 됩니다.
 *
 * 실행:
 *   npm install
 *   node 01_quickstart.mjs
 */

import { config } from "dotenv";
config({ path: new URL("../.env", import.meta.url).pathname }); // 어느 위치에서 실행해도 루트 .env 를 읽습니다.
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.AIHUB_API_KEY,
  baseURL: process.env.AIHUB_BASE_URL, // https://ai-hub.gabia.com/v1
});

const response = await client.chat.completions.create({
  // 모델명은 코드에 직접 적습니다. "-latest" 별칭은 항상 최신 버전을 가리킵니다.
  // 사용 가능한 전체 모델 목록은 02_list_models.mjs 로 확인하세요.
  model: "gpt-latest",
  messages: [
    { role: "user", content: "가비아 AI 허브를 한 문장으로 소개해줘." },
  ],
});

console.log(response.choices[0].message.content);
