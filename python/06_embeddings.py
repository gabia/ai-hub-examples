"""임베딩(embeddings) 예제.

텍스트를 벡터로 변환합니다. 검색·RAG·유사도 계산에 사용합니다.

실행:
    python 06_embeddings.py
"""

import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.environ["AIHUB_API_KEY"],
    base_url=os.environ["AIHUB_BASE_URL"],
)

response = client.embeddings.create(
    model="text-embedding-3-large",
    input="가비아 AI 허브",
)

vector = response.data[0].embedding
print(f"차원 수: {len(vector)}")
print(f"앞 5개 값: {vector[:5]}")
