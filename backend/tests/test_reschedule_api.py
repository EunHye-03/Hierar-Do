import pytest


@pytest.mark.asyncio
async def test_preview_empty_when_no_goals(client):
    resp = await client.post("/api/v1/reschedule/preview")
    assert resp.status_code == 200
    assert resp.json() == []


@pytest.mark.asyncio
async def test_apply_empty_when_no_goals(client):
    resp = await client.post("/api/v1/reschedule/apply")
    assert resp.status_code == 200
    assert resp.json() == {"updated": 0}


@pytest.mark.asyncio
async def test_preview_empty_when_all_todos_done(client, mock_pipeline):
    create_resp = await client.post(
        "/api/v1/goals",
        json={"raw_input": "테스트", "available_hours": {"weekday": 2, "weekend": 4}},
    )
    todos = create_resp.json()["todos"]
    for todo in todos:
        await client.patch(f"/api/v1/todos/{todo['id']}/done")

    resp = await client.post("/api/v1/reschedule/preview")
    assert resp.status_code == 200
    assert resp.json() == []


@pytest.mark.asyncio
async def test_preview_returns_rescheduled_items(client, mock_pipeline):
    # mock creates 12 todos (4 milestones × 3 todos) all with due_date=deadline(today+28)
    # algorithm redistributes from today → 8 of 12 get new dates
    await client.post(
        "/api/v1/goals",
        json={"raw_input": "테스트", "available_hours": {"weekday": 2, "weekend": 4}},
    )
    resp = await client.post("/api/v1/reschedule/preview")
    assert resp.status_code == 200
    items = resp.json()
    assert len(items) > 0
    for item in items:
        assert item["old_due_date"] != item["new_due_date"]
        assert "todo_id" in item
        assert "title" in item
        assert "new_due_date" in item


@pytest.mark.asyncio
async def test_apply_updates_todo_due_dates(client, mock_pipeline):
    await client.post(
        "/api/v1/goals",
        json={"raw_input": "테스트", "available_hours": {"weekday": 2, "weekend": 4}},
    )
    preview_items = (await client.post("/api/v1/reschedule/preview")).json()
    assert len(preview_items) > 0

    resp = await client.post("/api/v1/reschedule/apply")
    assert resp.status_code == 200
    assert resp.json()["updated"] == len(preview_items)


@pytest.mark.asyncio
async def test_apply_is_idempotent(client, mock_pipeline):
    await client.post(
        "/api/v1/goals",
        json={"raw_input": "테스트", "available_hours": {"weekday": 2, "weekend": 4}},
    )
    first = await client.post("/api/v1/reschedule/apply")
    assert first.json()["updated"] > 0

    second = await client.post("/api/v1/reschedule/apply")
    assert second.json()["updated"] == 0
