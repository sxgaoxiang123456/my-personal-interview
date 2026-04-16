from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError
from pydantic import BaseModel
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from auth import decode_token
from database import get_db
from models import ChatMessage, User

router = APIRouter(prefix="/analytics", tags=["analytics"])
bearer = HTTPBearer(auto_error=False)


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


class CalendarEntry(BaseModel):
    date: str
    count: int


class AchievementsMetrics(BaseModel):
    streak_days: int
    level: int
    total_messages: int


@router.get("/calendar", response_model=list[CalendarEntry])
async def get_calendar(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    since = datetime.now(timezone.utc) - timedelta(days=84)

    result = await db.execute(
        select(
            func.date(ChatMessage.created_at).label("day"),
            func.count(ChatMessage.id).label("cnt"),
        )
        .where(
            ChatMessage.user_id == current_user.id,
            ChatMessage.role == "user",
            ChatMessage.created_at >= since,
        )
        .group_by(func.date(ChatMessage.created_at))
        .order_by(func.date(ChatMessage.created_at).asc())
    )

    return [CalendarEntry(date=row.day, count=row.cnt) for row in result]


@router.get("/achievements", response_model=AchievementsMetrics)
async def get_achievements(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    total = await db.scalar(
        select(func.count(ChatMessage.id)).where(
            ChatMessage.user_id == current_user.id,
            ChatMessage.role == "user",
        )
    )

    return AchievementsMetrics(
        streak_days=current_user.streak_days,
        level=current_user.level,
        total_messages=total or 0,
    )
