import json
import os
from typing import AsyncIterator

import httpx
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sse_starlette.sse import EventSourceResponse

from auth import decode_token
from database import get_db
from models import ChatMessage, User

router = APIRouter(prefix="/chat", tags=["chat"])
bearer = HTTPBearer(auto_error=False)

DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions"
DEEPSEEK_MODEL = "deepseek-chat"
HISTORY_LIMIT = 20


def _get_api_key() -> str:
    key = os.environ.get("DEEPSEEK_API_KEY", "")
    if not key:
        raise ValueError("DEEPSEEK_API_KEY environment variable is not set")
    return key


async def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer),
    db: AsyncSession = Depends(get_db),
) -> User:
    if not credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        user_id = decode_token(credentials.credentials, "access")
    except JWTError:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user


class ChatRequest(BaseModel):
    message: str


class MessageOut(BaseModel):
    id: int
    role: str
    content: str
    created_at: str

    model_config = {"from_attributes": True}


@router.get("/messages", response_model=list[MessageOut])
async def get_messages(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.user_id == current_user.id)
        .order_by(ChatMessage.created_at.asc())
        .limit(50)
    )
    messages = result.scalars().all()
    return [
        MessageOut(
            id=m.id,
            role=m.role,
            content=m.content,
            created_at=m.created_at.isoformat(),
        )
        for m in messages
    ]


@router.post("/stream")
async def chat_stream(
    body: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    api_key = _get_api_key()

    # Persist user message
    user_msg = ChatMessage(
        user_id=current_user.id,
        role="user",
        content=body.message,
    )
    db.add(user_msg)
    await db.commit()

    # Load recent history for context
    result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.user_id == current_user.id)
        .order_by(ChatMessage.created_at.desc())
        .limit(HISTORY_LIMIT)
    )
    history = list(reversed(result.scalars().all()))

    system_prompt = (
        f"你是 StudyPal AI 学习助手。"
        f"用户当前连续学习 {current_user.streak_days} 天，等级 {current_user.level}。"
        f"请基于用户的学习进度，给出个性化、鼓励性的学习建议。"
        f"回复使用 Markdown 格式，保持简洁友好。"
    )

    messages = [{"role": "system", "content": system_prompt}]
    for m in history:
        messages.append({"role": m.role, "content": m.content})

    async def generate() -> AsyncIterator[str]:
        full_response = []
        try:
            async with httpx.AsyncClient(timeout=60) as client:
                async with client.stream(
                    "POST",
                    DEEPSEEK_API_URL,
                    headers={
                        "Authorization": f"Bearer {api_key}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "model": DEEPSEEK_MODEL,
                        "messages": messages,
                        "stream": True,
                        "max_tokens": 2048,
                    },
                ) as response:
                    if response.status_code != 200:
                        yield json.dumps({"error": "AI service unavailable"})
                        return
                    async for line in response.aiter_lines():
                        if not line.startswith("data:"):
                            continue
                        data_str = line[5:].strip()
                        if data_str == "[DONE]":
                            break
                        try:
                            data = json.loads(data_str)
                            delta = data["choices"][0]["delta"].get("content", "")
                            if delta:
                                full_response.append(delta)
                                yield json.dumps({"delta": delta})
                        except (json.JSONDecodeError, KeyError, IndexError):
                            continue
        except httpx.RequestError:
            yield json.dumps({"error": "AI service unavailable"})
            return

        # Persist complete assistant reply
        if full_response:
            assistant_msg = ChatMessage(
                user_id=current_user.id,
                role="assistant",
                content="".join(full_response),
            )
            db.add(assistant_msg)
            await db.commit()

        yield "[DONE]"

    return EventSourceResponse(generate())
