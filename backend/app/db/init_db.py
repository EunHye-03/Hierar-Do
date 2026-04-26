from app.db.session import engine, Base
import app.models  # noqa: F401 — 모든 모델 등록 트리거


async def init_db() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
