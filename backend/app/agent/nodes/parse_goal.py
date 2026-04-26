import json
from datetime import date, timedelta

import anthropic

from app.agent.state import HierarDoState, ParsedGoal

_client = anthropic.Anthropic()

_SYSTEM = """You are a goal parsing assistant. Extract a structured goal from the user's natural language input.
Return ONLY a valid JSON object with exactly these fields:
- "title": concise goal title (Korean is fine, max 50 chars)
- "deadline": ISO date string YYYY-MM-DD (default to 30 days from today if not specified)

Today's date is {today}. No explanation — JSON only."""


def parse_goal_node(state: HierarDoState) -> dict:
    today = date.today().isoformat()
    default_deadline = (date.today() + timedelta(days=30)).isoformat()
    response = _client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=256,
        system=_SYSTEM.format(today=today),
        messages=[{"role": "user", "content": state["raw_input"]}],
    )
    raw = response.content[0].text.strip()
    # 코드 블록 제거
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    data = json.loads(raw)
    data.setdefault("deadline", default_deadline)
    return {"goal": ParsedGoal(**data)}
