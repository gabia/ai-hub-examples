/**
 * Function calling (tool use) 예제.
 *
 * 모델이 직접 답하는 대신 "이 함수를 이런 인자로 호출해줘" 라고 요청하면,
 * 애플리케이션이 실제 함수를 실행하고 결과를 다시 모델에 전달합니다.
 *
 * 실행:
 *   node 04_function_calling.mjs
 */

import { config } from "dotenv";
config({ path: new URL("../.env", import.meta.url).pathname }); // 어느 위치에서 실행해도 루트 .env 를 읽습니다.
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.AIHUB_API_KEY,
  baseURL: process.env.AIHUB_BASE_URL,
});

const tools = [
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "특정 도시의 현재 날씨를 조회한다.",
      parameters: {
        type: "object",
        properties: {
          city: { type: "string", description: "도시 이름, 예: 서울" },
        },
        required: ["city"],
      },
    },
  },
];

// 실제 서비스라면 외부 날씨 API를 호출합니다. 여기서는 더미 값.
function getWeather(city) {
  return JSON.stringify({ city, temperature: "23도", condition: "맑음" });
}

const messages = [{ role: "user", content: "서울 날씨 어때?" }];

// 1단계: 모델이 어떤 함수를 호출할지 결정
const first = await client.chat.completions.create({
  model: "gpt-latest",
  messages,
  tools,
});
const message = first.choices[0].message;
messages.push(message);

// 2단계: 모델이 요청한 함수를 실제로 실행
for (const toolCall of message.tool_calls ?? []) {
  const args = JSON.parse(toolCall.function.arguments);
  const result = getWeather(args.city);
  messages.push({
    role: "tool",
    tool_call_id: toolCall.id,
    content: result,
  });
}

// 3단계: 함수 결과를 넣어 최종 답변 생성
const second = await client.chat.completions.create({
  model: "gpt-latest",
  messages,
});
console.log(second.choices[0].message.content);
