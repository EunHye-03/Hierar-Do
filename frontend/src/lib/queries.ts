// frontend/src/lib/queries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { CreateGoalRequest, CreateGoalResponse, Goal, RescheduleItem } from "@/lib/types";

export function useGoals() {
  return useQuery<Goal[]>({
    queryKey: ["goals"],
    queryFn: () => api.get<Goal[]>("/api/v1/goals"),
  });
}

export function useCreateGoal(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation<CreateGoalResponse, Error, CreateGoalRequest>({
    mutationFn: (body) => api.post<CreateGoalResponse>("/api/v1/goals", body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      onSuccess?.();
    },
  });
}

export function useToggleTodo() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, { todoId: number; isDone: boolean }>({
    mutationFn: ({ todoId, isDone }) =>
      api.patch(`/api/v1/todos/${todoId}/${isDone ? "done" : "undone"}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["goals"] }),
  });
}

export function useReschedulePreview() {
  return useMutation<RescheduleItem[], Error, void>({
    mutationFn: () => api.post<RescheduleItem[]>("/api/v1/reschedule/preview"),
  });
}

export function useRescheduleApply() {
  const queryClient = useQueryClient();
  return useMutation<{ updated: number }, Error, void>({
    mutationFn: () => api.post<{ updated: number }>("/api/v1/reschedule/apply"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["goals"] }),
  });
}
