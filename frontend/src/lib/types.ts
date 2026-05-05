// frontend/src/lib/types.ts
export type GoalStatus = "pending" | "active" | "done";

export interface Todo {
  id: number;
  milestone_id: number;
  title: string;
  due_date: string | null;
  estimated_minutes: number;
  is_done: boolean;
  suggested_by_ai: boolean;
}

export interface Milestone {
  id: number;
  goal_id: number;
  title: string;
  week_number: number;
  status: string;
  suggested_by_ai: boolean;
  todos: Todo[];
}

export interface Goal {
  id: number;
  title: string;
  raw_input: string;
  deadline: string;
  status: GoalStatus;
  created_at: string;
  milestones: Milestone[];
}

export interface CreateGoalRequest {
  raw_input: string;
  available_hours: { weekday: number; weekend: number };
}

export interface CreateGoalResponse {
  goal: Goal;
  milestones: Milestone[];
  todos: Todo[];
}

export interface RescheduleItem {
  todo_id: number;
  title: string;
  old_due_date: string | null;
  new_due_date: string;
}
