import asyncio

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.agent.graph import pipeline
from app.db.session import get_db
from app.models.goal import Goal
from app.models.milestone import Milestone
from app.models.todo import Todo
from app.models.user import User
from app.schemas.goal import (
    CreateGoalRequest,
    CreateGoalResponse,
    GoalOut,
    MilestoneOut,
    TodoOut,
)

router = APIRouter(prefix="/goals", tags=["goals"])
_MVP_USER_ID = 1


async def _ensure_default_user(db: AsyncSession) -> None:
    result = await db.execute(select(User).where(User.id == _MVP_USER_ID))
    if result.scalar_one_or_none() is None:
        db.add(User(id=_MVP_USER_ID, email="default@hierardo.app"))
        await db.commit()


@router.post("", response_model=CreateGoalResponse)
async def create_goal(
    req: CreateGoalRequest, db: AsyncSession = Depends(get_db)
):
    await _ensure_default_user(db)

    state = {
        "raw_input": req.raw_input,
        "available_hours": req.available_hours,
        "goal": None,
        "milestones": [],
        "error": None,
    }
    result = await asyncio.to_thread(pipeline.invoke, state)

    if result.get("error"):
        raise HTTPException(status_code=500, detail=result["error"])

    parsed_goal = result["goal"]
    parsed_milestones = result["milestones"]

    goal = Goal(
        user_id=_MVP_USER_ID,
        title=parsed_goal.title,
        raw_input=req.raw_input,
        deadline=parsed_goal.deadline,
    )
    db.add(goal)
    await db.flush()

    for pm in parsed_milestones:
        milestone = Milestone(
            goal_id=goal.id,
            title=pm.title,
            week_number=pm.week_number,
            suggested_by_ai=True,
        )
        db.add(milestone)
        await db.flush()
        for pt in pm.todos:
            db.add(
                Todo(
                    milestone_id=milestone.id,
                    title=pt.title,
                    due_date=pt.due_date,
                    estimated_minutes=pt.estimated_minutes,
                    suggested_by_ai=True,
                )
            )

    await db.commit()

    rows = await db.execute(
        select(Goal)
        .options(selectinload(Goal.milestones).selectinload(Milestone.todos))
        .where(Goal.id == goal.id)
    )
    goal = rows.scalar_one()

    all_todos = [t for m in goal.milestones for t in m.todos]
    return CreateGoalResponse(
        goal=GoalOut.model_validate(goal),
        milestones=[MilestoneOut.model_validate(m) for m in goal.milestones],
        todos=[TodoOut.model_validate(t) for t in all_todos],
    )


@router.get("", response_model=list[GoalOut])
async def list_goals(db: AsyncSession = Depends(get_db)):
    rows = await db.execute(
        select(Goal)
        .where(Goal.user_id == _MVP_USER_ID)
        .options(selectinload(Goal.milestones).selectinload(Milestone.todos))
        .order_by(Goal.created_at.desc())
    )
    return [GoalOut.model_validate(g) for g in rows.scalars().all()]


@router.get("/{goal_id}", response_model=GoalOut)
async def get_goal(goal_id: int, db: AsyncSession = Depends(get_db)):
    rows = await db.execute(
        select(Goal)
        .where(Goal.id == goal_id, Goal.user_id == _MVP_USER_ID)
        .options(selectinload(Goal.milestones).selectinload(Milestone.todos))
    )
    goal = rows.scalar_one_or_none()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    return GoalOut.model_validate(goal)


@router.get("/{goal_id}/suggest", response_model=dict)
async def suggest_goal(_goal_id: int):
    return {"message": "MVP 이후 구현 예정"}


@router.post("/{goal_id}/apply", response_model=dict)
async def apply_suggestion(_goal_id: int):
    return {"message": "MVP 이후 구현 예정"}
