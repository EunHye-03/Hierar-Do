from datetime import date, timedelta

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.db.session import get_db
from app.models.goal import Goal, GoalStatus
from app.models.milestone import Milestone
from app.models.todo import Todo

router = APIRouter(prefix="/reschedule", tags=["reschedule"])
_MVP_USER_ID = 1


class RescheduleItem(BaseModel):
    todo_id: int
    title: str
    old_due_date: date | None
    new_due_date: date


def _compute_reschedule(goals: list[Goal]) -> list[tuple[Todo, date]]:
    today = date.today()
    result: list[tuple[Todo, date]] = []
    for goal in goals:
        todos = [t for m in goal.milestones for t in m.todos if not t.is_done]
        if not todos:
            continue
        remaining = max((goal.deadline - today).days, 0)
        n = len(todos)
        for i, todo in enumerate(todos):
            if remaining == 0 or n == 1:
                new_date = today
            else:
                offset = int(i * remaining / (n - 1))
                new_date = today + timedelta(days=offset)
                if new_date > goal.deadline:
                    new_date = goal.deadline
            result.append((todo, new_date))
    return result


async def _load_goals(db: AsyncSession) -> list[Goal]:
    rows = await db.execute(
        select(Goal)
        .where(Goal.user_id == _MVP_USER_ID, Goal.status != GoalStatus.done)
        .options(selectinload(Goal.milestones).selectinload(Milestone.todos))
    )
    return list(rows.scalars().all())


@router.post("/preview", response_model=list[RescheduleItem])
async def preview_reschedule(db: AsyncSession = Depends(get_db)):
    goals = await _load_goals(db)
    changes = _compute_reschedule(goals)
    return [
        RescheduleItem(
            todo_id=todo.id,
            title=todo.title,
            old_due_date=todo.due_date,
            new_due_date=new_date,
        )
        for todo, new_date in changes
        if todo.due_date != new_date
    ]


@router.post("/apply", response_model=dict)
async def apply_reschedule(db: AsyncSession = Depends(get_db)):
    goals = await _load_goals(db)
    changes = _compute_reschedule(goals)
    count = 0
    for todo, new_date in changes:
        if todo.due_date != new_date:
            todo.due_date = new_date
            count += 1
    if count:
        await db.commit()
    return {"updated": count}
