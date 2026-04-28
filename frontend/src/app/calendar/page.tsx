// frontend/src/app/calendar/page.tsx
"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useGoals, useToggleTodo } from "@/lib/queries";
import { MonthCalendar } from "@/components/MonthCalendar";
import { WeekDetail } from "@/components/WeekDetail";
import type { Todo } from "@/lib/types";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });
  const { data: goals = [], isLoading } = useGoals();
  const { mutate: toggleTodo } = useToggleTodo();

  const todosByDate = useMemo<Record<string, Todo[]>>(() => {
    const map: Record<string, Todo[]> = {};
    goals
      .flatMap((g) => g.milestones.flatMap((m) => m.todos))
      .filter((t): t is Todo & { due_date: string } => t.due_date !== null)
      .forEach((t) => {
        map[t.due_date] ??= [];
        map[t.due_date].push(t);
      });
    return map;
  }, [goals]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex items-center px-4 h-16 bg-slate-50 border-b border-slate-200">
        <Link
          href="/"
          className="flex items-center gap-1 text-primary hover:opacity-80 transition-opacity"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="text-sm font-bold">돌아가기</span>
        </Link>
        <h1 className="flex-1 text-center text-lg font-extrabold tracking-tight text-primary">
          캘린더
        </h1>
        <div className="w-16" />
      </header>

      <main className="pt-24 pb-24 px-4 max-w-[1400px] mx-auto">
        {isLoading ? (
          <div className="pt-16 text-center text-on-surface-variant text-sm">
            로딩 중...
          </div>
        ) : (
          <>
            <MonthCalendar
              todosByDate={todosByDate}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
            <WeekDetail
              selectedDate={selectedDate}
              todosByDate={todosByDate}
              onToggle={(todoId, isDone) => toggleTodo({ todoId, isDone })}
            />
          </>
        )}
      </main>
    </>
  );
}
