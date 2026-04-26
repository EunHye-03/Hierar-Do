from langgraph.graph import StateGraph, END

from app.agent.state import HierarDoState
from app.agent.nodes.parse_goal import parse_goal_node
from app.agent.nodes.decompose import decompose_node
from app.agent.nodes.schedule import schedule_node


def _build():
    graph = StateGraph(HierarDoState)
    graph.add_node("parse_goal", parse_goal_node)
    graph.add_node("decompose", decompose_node)
    graph.add_node("schedule", schedule_node)
    graph.set_entry_point("parse_goal")
    graph.add_edge("parse_goal", "decompose")
    graph.add_edge("decompose", "schedule")
    graph.add_edge("schedule", END)
    return graph.compile()


pipeline = _build()
