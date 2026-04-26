from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.todo import Todo
from app.schemas.goal import TodoOut

router = APIRouter(prefix="/todos", tags=["todos"])


async def _get_todo_or_404(todo_id: int, db: AsyncSession) -> Todo:
    result = await db.execute(select(Todo).where(Todo.id == todo_id))
    todo = result.scalar_one_or_none()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo


@router.patch("/{todo_id}/done", response_model=TodoOut)
async def mark_done(todo_id: int, db: AsyncSession = Depends(get_db)):
    todo = await _get_todo_or_404(todo_id, db)
    todo.is_done = True
    await db.commit()
    await db.refresh(todo)
    return TodoOut.model_validate(todo)


@router.patch("/{todo_id}/undone", response_model=TodoOut)
async def mark_undone(todo_id: int, db: AsyncSession = Depends(get_db)):
    todo = await _get_todo_or_404(todo_id, db)
    todo.is_done = False
    await db.commit()
    await db.refresh(todo)
    return TodoOut.model_validate(todo)
