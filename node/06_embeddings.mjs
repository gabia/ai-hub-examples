/**
 * 임베딩(embeddings) 예제.
 *
 * 텍스트를 벡터로 변환합니다. 검색·RAG·유사도 계산에 사용합니다.
 *
 * 실행:
 *   node 06_embeddings.mjs
 */

import { config } from "dotenv";
config({ path: new URL("../.env", import.meta.url).pathname }); // 어느 위치에서 실행해도 루트 .env 를 읽습니다.
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.AIHUB_API_KEY,
  baseURL: process.env.AIHUB_BASE_URL,
});

const response = await client.embeddings.create({
  model: "text-embedding-3-large",
  input: "가비아 AI 허브",
});

const vector = response.data[0].embedding;
console.log(`차원 수: ${vector.length}`);
console.log(`앞 5개 값: ${vector.slice(0, 5)}`);
