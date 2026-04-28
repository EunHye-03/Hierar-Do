// frontend/src/components/WeekDetail.tsx
"use client";
import type { Todo } from "@/lib/types";

interface WeekDetailProps {
  selectedDate: string;
  todosByDate: Record<string, Todo[]>;
  onToggle: (todoId: number, isDone: boolean) => void;
}

const DAY_LABELS = ["월", "화", "수", "목", "금", "토", "일"];

function toDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getWeekDays(dateStr: string): Date[] {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const day = date.getDay(); // 0=일요일
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(y, m - 1, d + diffToMonday);
  return Array.from({ length: 7 }, (_, i) => {
    const dt = new Date(monday);
    dt.setDate(monday.getDate() + i);
    return dt;
  });
}

export function WeekDetail({ selectedDate, todosByDate, onToggle }: WeekDetailProps) {
  const weekDays = getWeekDays(selectedDate);
  const hasAnyTodo = weekDays.some((d) => todosByDate[toDateStr(d)]?.length);
  const firstDay = weekDays[0];
  const lastDay = weekDays[6];

  return (
    <div className="mt-6">
      <h3 className="font-bold text-lg text-on-surface mb-4">
        {firstDay.getMonth() + 1}월 {firstDay.getDate()}일 —{" "}
        {lastDay.getMonth() + 1}월 {lastDay.getDate()}일
      </h3>
      {!hasAnyTodo ? (
        <div className="text-sm text-on-surface-variant text-center py-8">
          이 주에는 할 일이 없어요.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 gap-3 min-w-[700px]">
            {weekDays.map((day, i) => {
              const dateStr = toDateStr(day);
              const isSelected = dateStr === selectedDate;
              const todos = todosByDate[dateStr] ?? [];
              return (
                <div key={dateStr}>
                  <div
                    className={`text-center mb-2 py-1 rounded-lg ${
                      isSelected ? "bg-primary text-white" : "text-on-surface"
                    }`}
                  >
                    <div className="text-[10px] font-bold">{DAY_LABELS[i]}</div>
                    <div className="text-sm font-bold">{day.getDate()}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {todos.length === 0 && (
                      <span className="text-[10px] text-on-surface-variant text-center block pt-2">—</span>
                    )}
                    {todos.map((todo) => (
                      <label
                        key={todo.id}
                        className="flex items-start gap-2 p-2 bg-white border border-outline-variant rounded-lg cursor-pointer hover:bg-surface transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={todo.is_done}
                          onChange={() => onToggle(todo.id, !todo.is_done)}
                          className="mt-0.5 w-4 h-4 rounded border-outline text-primary focus:ring-primary shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span
                            className={`text-xs font-semibold block truncate ${
                              todo.is_done
                                ? "line-through text-outline"
                                : "text-on-surface"
                            }`}
                          >
                            {todo.title}
                          </span>
                          {todo.estimated_minutes > 0 && (
                            <span className="text-[10px] text-outline">
                              {todo.estimated_minutes}분
                            </span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
