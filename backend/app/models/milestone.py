import enum

from sqlalchemy import Integer, String, Enum, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class MilestoneStatus(str, enum.Enum):
    pending = "pending"
    active = "active"
    done = "done"


class Milestone(Base):
    __tablename__ = "milestones"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    goal_id: Mapped[int] = mapped_column(Integer, ForeignKey("goals.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    week_number: Mapped[int] = mapped_column(Integer, nullable=False)
    status: Mapped[MilestoneStatus] = mapped_column(
        Enum(MilestoneStatus, native_enum=False), nullable=False, default=MilestoneStatus.pending
    )
    suggested_by_ai: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    goal = relationship("Goal", back_populates="milestones")
    todos = relationship(
        "Todo", back_populates="milestone", cascade="all, delete-orphan"
    )
