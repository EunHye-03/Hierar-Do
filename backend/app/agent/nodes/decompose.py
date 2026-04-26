import json

import anthropic

from app.agent.state import HierarDoState, ParsedMilestone, ParsedTodo

_client = anthropic.Anthropic()

_SYSTEM = """You are a task decomposition assistant. Break the given goal into exactly 4 weekly milestones.
Each milestone must have 3-5 daily todos with realistic estimated_minutes (15-120).

Return ONLY a valid JSON array:
[
  {
    "title": "milestone title (Korean OK)",
    "week_number": 1,
    "todos": [
      {"title": "todo title (Korean OK)", "estimated_minutes": 30}
    ]
  }
]

No explanation — JSON array only."""


def decompose_node(state: HierarDoState) -> dict:
    goal = state["goal"]
    prompt = (
        f"Goal: {goal.title}\n"
        f"Deadline: {goal.deadline}\n"
        f"Available hours per day — weekday: {state['available_hours'].get('weekday', 2)}h, "
        f"weekend: {state['available_hours'].get('weekend', 4)}h"
    )
    response = _client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4096,
        system=_SYSTEM,
        messages=[{"role": "user", "content": prompt}],
    )
    raw = response.content[0].text.strip()
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    data = json.loads(raw)
    milestones = [
        ParsedMilestone(
            title=m["title"],
            week_number=m["week_number"],
            todos=[ParsedTodo(**t) for t in m["todos"]],
        )
        for m in data
    ]
    return {"milestones": milestones}
