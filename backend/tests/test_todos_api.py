import pytest


@pytest.mark.asyncio
async def test_mark_todo_done(client, mock_pipeline):
    create_resp = await client.post(
        "/api/v1/goals",
        json={"raw_input": "테스트 목표", "available_hours": {"weekday": 2, "weekend": 4}},
    )
    todos = create_resp.json()["todos"]
    todo_id = todos[0]["id"]

    resp = await client.patch(f"/api/v1/todos/{todo_id}/done")
    assert resp.status_code == 200
    assert resp.json()["is_done"] is True


@pytest.mark.asyncio
async def test_mark_todo_undone(client, mock_pipeline):
    create_resp = await client.post(
        "/api/v1/goals",
        json={"raw_input": "테스트 목표", "available_hours": {"weekday": 2, "weekend": 4}},
    )
    todo_id = create_resp.json()["todos"][0]["id"]

    await client.patch(f"/api/v1/todos/{todo_id}/done")
    resp = await client.patch(f"/api/v1/todos/{todo_id}/undone")
    assert resp.status_code == 200
    assert resp.json()["is_done"] is False


@pytest.mark.asyncio
async def test_todo_not_found(client):
    resp = await client.patch("/api/v1/todos/9999/done")
    assert resp.status_code == 404
