import pytest


@pytest.mark.asyncio
async def test_create_goal_returns_200(client, mock_pipeline):
    resp = await client.post(
        "/api/v1/goals",
        json={"raw_input": "이번 달 토익 900점", "available_hours": {"weekday": 2, "weekend": 4}},
    )
    assert resp.status_code == 200
    body = resp.json()
    assert "goal" in body
    assert "milestones" in body
    assert "todos" in body
    assert body["goal"]["title"] == "토익 900점 달성"
    assert len(body["milestones"]) == 4


@pytest.mark.asyncio
async def test_list_goals_empty(client):
    resp = await client.get("/api/v1/goals")
    assert resp.status_code == 200
    assert resp.json() == []


@pytest.mark.asyncio
async def test_get_goal_not_found(client):
    resp = await client.get("/api/v1/goals/999")
    assert resp.status_code == 404


@pytest.mark.asyncio
async def test_create_then_get_goal(client, mock_pipeline):
    create_resp = await client.post(
        "/api/v1/goals",
        json={"raw_input": "이번 달 토익 900점", "available_hours": {"weekday": 2, "weekend": 4}},
    )
    goal_id = create_resp.json()["goal"]["id"]
    get_resp = await client.get(f"/api/v1/goals/{goal_id}")
    assert get_resp.status_code == 200
    assert get_resp.json()["id"] == goal_id
