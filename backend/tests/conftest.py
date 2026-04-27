import pytest
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from unittest.mock import patch
from datetime import date, timedelta

import app.models  # noqa: F401 — 모든 테이블 등록
from app.main import app
from app.db.session import Base, get_db
from app.agent.state import ParsedGoal, ParsedMilestone, ParsedTodo

TEST_DB_URL = "sqlite+aiosqlite:///:memory:"
test_engine = create_async_engine(TEST_DB_URL, echo=False)
TestSession = async_sessionmaker(test_engine, expire_on_commit=False)


async def override_get_db():
    async with TestSession() as session:
        yield session


@pytest.fixture(autouse=True)
async def setup_db():
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest.fixture
def mock_pipeline():
    deadline = date.today() + timedelta(days=28)
    fake_result = {
        "goal": ParsedGoal(title="토익 900점 달성", deadline=deadline),
        "milestones": [
            ParsedMilestone(
                title=f"마일스톤 {w}주차",
                week_number=w,
                todos=[
                    ParsedTodo(title=f"할 일 {w}-{t}", estimated_minutes=30, due_date=deadline)
                    for t in range(3)
                ],
            )
            for w in range(1, 5)
        ],
        "error": None,
    }
    with patch("app.api.v1.goals.pipeline") as mock:
        mock.invoke.return_value = fake_result
        yield mock


@pytest.fixture
async def client():
    app.dependency_overrides[get_db] = override_get_db
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
        yield c
    app.dependency_overrides.clear()
