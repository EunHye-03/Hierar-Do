from datetime import date, timedelta

from app.agent.state import HierarDoState, ParsedGoal, ParsedMilestone, ParsedTodo
from app.agent.nodes.schedule import schedule_node


def _make_state(weeks: int = 4, todos_per_week: int = 3) -> HierarDoState:
    deadline = date.today() + timedelta(days=28)
    milestones = [
        ParsedMilestone(
            title=f"마일스톤 {w}",
            week_number=w,
            todos=[
                ParsedTodo(title=f"할 일 {w}-{t}", estimated_minutes=30)
                for t in range(todos_per_week)
            ],
        )
        for w in range(1, weeks + 1)
    ]
    return HierarDoState(
        raw_input="테스트",
        available_hours={"weekday": 2, "weekend": 4},
        goal=ParsedGoal(title="테스트 목표", deadline=deadline),
        milestones=milestones,
        error=None,
    )


def test_schedule_assigns_due_dates():
    state = _make_state()
    result = schedule_node(state)
    for milestone in result["milestones"]:
        for todo in milestone.todos:
            assert todo.due_date is not None, "due_date가 None이면 안 됨"


def test_schedule_due_dates_within_deadline():
    state = _make_state()
    deadline = state["goal"].deadline
    result = schedule_node(state)
    for milestone in result["milestones"]:
        for todo in milestone.todos:
            assert todo.due_date <= deadline, f"due_date {todo.due_date}가 deadline {deadline}를 초과"


def test_schedule_week1_before_week4():
    state = _make_state()
    result = schedule_node(state)
    milestones = result["milestones"]
    week1_dates = [t.due_date for t in milestones[0].todos]
    week4_dates = [t.due_date for t in milestones[3].todos]
    assert max(week1_dates) <= min(week4_dates), "1주차 날짜가 4주차보다 앞서야 함"
