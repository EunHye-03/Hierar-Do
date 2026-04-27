from datetime import date, datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel


class GoalStatus(str, Enum):
    pending = "pending"
    active = "active"
    done = "done"


class TodoOut(BaseModel):
    id: int
    milestone_id: int
    title: str
    due_date: Optional[date]
    estimated_minutes: int
    is_done: bool
    suggested_by_ai: bool

    model_config = {"from_attributes": True}


class MilestoneOut(BaseModel):
    id: int
    goal_id: int
    title: str
    week_number: int
    status: str
    suggested_by_ai: bool
    todos: list[TodoOut] = []

    model_config = {"from_attributes": True}


class GoalOut(BaseModel):
    id: int
    title: str
    raw_input: str
    deadline: date
    status: GoalStatus
    created_at: datetime
    milestones: list[MilestoneOut] = []

    model_config = {"from_attributes": True}


class CreateGoalRequest(BaseModel):
    raw_input: str
    available_hours: dict  # {"weekday": int, "weekend": int}


class CreateGoalResponse(BaseModel):
    goal: GoalOut
    milestones: list[MilestoneOut]
    todos: list[TodoOut]
