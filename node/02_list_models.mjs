/**
 * 사용 가능한 모델 목록 조회.
 *
 * 가비아 AI 허브에 등록된 모델 목록을 반환합니다.
 * 예제 코드에 모델명을 직접 적기 전에, 먼저 이걸로 확인하세요.
 *
 * 참고: /v1/models 응답의 모델명 필드는 OpenAI 표준의 "id" 가 아니라
 * "model_name" 입니다. 그래서 이 예제만 OpenAI SDK 대신 fetch 로 직접 조회합니다.
 *
 * 실행:
 *   node 02_list_models.mjs
 */

import { config } from "dotenv";
config({ path: new URL("../.env", import.meta.url).pathname }); // 어느 위치에서 실행해도 루트 .env 를 읽습니다.

const response = await fetch(`${process.env.AIHUB_BASE_URL}/models`, {
  headers: { Authorization: `Bearer ${process.env.AIHUB_API_KEY}` },
});
if (!response.ok) throw new Error(`HTTP ${response.status}`);

const { data } = await response.json();
for (const model of data) {
  console.log(model.model_name);
}
