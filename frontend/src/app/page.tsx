// frontend/src/app/page.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { useGoals, useToggleTodo } from "@/lib/queries";
import { GoalModal } from "@/components/GoalModal";

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: goals = [], isLoading } = useGoals();
  const { mutate: toggleTodo } = useToggleTodo();

  const today = new Date().toISOString().slice(0, 10);
  const todayTodos = goals
    .flatMap((g) => g.milestones.flatMap((m) => m.todos))
    .filter((t) => t.due_date === today);

  const latestGoal = goals[0] ?? null;
  const milestones = latestGoal?.milestones ?? [];

  if (isLoading) {
    return (
      <div className="pt-24 px-6 text-on-surface-variant text-sm">
        로딩 중...
      </div>
    );
  }

  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-slate-50 border-b border-slate-200 shadow-none transition-all duration-200 ease-in-out">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">menu</span>
          <h1 className="text-xl font-extrabold tracking-tight text-primary">
            Hierar-Do
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold tracking-tight text-primary">
            에이전트 브리핑
          </span>
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border border-indigo-200">
            <span className="material-symbols-outlined text-secondary text-base">
              person
            </span>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-24 px-6 max-w-[1400px] mx-auto">
        {goals.length === 0 ? (
          <div className="pt-16 text-center text-on-surface-variant">
            아직 목표가 없어요. + 버튼으로 첫 목표를 만들어보세요!
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {/* Tier 1: Daily Checklist */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-2xl text-primary border-l-4 border-primary pl-4">
                    일일 체크리스트
                  </h2>
                  <span className="text-sm text-outline font-medium">오늘</span>
                </div>
                <div className="bg-white border border-outline-variant rounded-xl divide-y divide-slate-100 shadow-md">
                  {todayTodos.length === 0 ? (
                    <div className="p-5 text-sm text-on-surface-variant text-center">
                      오늘 할 일이 없어요.
                    </div>
                  ) : (
                    todayTodos.map((todo) => (
                      <label
                        key={todo.id}
                        className="flex items-center gap-4 p-5 hover:bg-surface transition-colors cursor-pointer"
                      >
                        <input
                          checked={todo.is_done}
                          onChange={() =>
                            toggleTodo({ todoId: todo.id, isDone: !todo.is_done })
                          }
                          className="w-5 h-5 rounded border-outline text-primary-container focus:ring-primary"
                          type="checkbox"
                        />
                        <div className="flex-1">
                          <span
                            className={`text-base font-semibold ${
                              todo.is_done ? "line-through text-outline" : ""
                            }`}
                          >
                            {todo.title}
                          </span>
                        </div>
                        {todo.estimated_minutes > 0 && (
                          <span className="text-[10px] text-outline">
                            {todo.estimated_minutes}분
                          </span>
                        )}
                      </label>
                    ))
                  )}
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col justify-center">
                <div className="bg-primary text-on-primary p-card-padding rounded-xl shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <span className="material-symbols-outlined text-6xl">
                      smart_toy
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-lg">
                      bolt
                    </span>
                    <h4 className="text-[10px] uppercase tracking-[0.15em] text-white/70 font-bold">
                      시스템 인텔리전스
                    </h4>
                  </div>
                  <p className="text-lg leading-relaxed mb-6">
                    오늘 할 일{" "}
                    <span className="font-bold underline decoration-white/30">
                      {todayTodos.filter((t) => t.is_done).length}/
                      {todayTodos.length}
                    </span>
                    개 완료.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60 font-medium">
                      {latestGoal.title}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Tier 2: Weekly Milestones */}
            <section className="relative">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-2xl text-primary">
                  주간 마일스톤
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative pl-indent">
                <div className="stem-line" />
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="relative">
                    <div className="stem-connector" />
                    <div className="bg-surface-container-lowest border border-outline-variant p-card-padding rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">
                          {milestone.week_number}주차
                        </div>
                      </div>
                      <h4 className="font-semibold text-lg text-on-surface mb-2">
                        {milestone.title}
                      </h4>
                      <div className="flex items-center gap-4">
                        <div className="h-1 flex-1 bg-surface-container rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{
                              width: `${
                                milestone.todos.length === 0
                                  ? 0
                                  : Math.round(
                                      (milestone.todos.filter((t) => t.is_done)
                                        .length /
                                        milestone.todos.length) *
                                        100
                                    )
                              }%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-outline font-bold">
                          {milestone.todos.length === 0
                            ? "0"
                            : Math.round(
                                (milestone.todos.filter((t) => t.is_done)
                                  .length /
                                  milestone.todos.length) *
                                  100
                              )}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tier 3: Monthly Goal */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-2xl text-primary">월간 목표</h2>
                <span className="text-xs font-bold bg-secondary-container text-on-secondary-container px-2 py-1 rounded">
                  {latestGoal.deadline}까지
                </span>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant p-card-padding rounded-xl relative overflow-hidden shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <h3 className="font-semibold text-lg text-primary">
                    {latestGoal.title}
                  </h3>
                </div>
                <p className="text-base text-on-surface-variant">
                  {latestGoal.raw_input}
                </p>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* FAB */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors md:bottom-8"
        aria-label="새 목표 추가"
      >
        <span className="material-symbols-outlined">add</span>
      </button>

      {modalOpen && <GoalModal onClose={() => setModalOpen(false)} />}

      {/* Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-2 h-20 bg-white border-t border-slate-200">
        <div className="flex flex-col items-center justify-center bg-indigo-50 text-primary rounded-xl px-3 py-1 transition-transform active:scale-95">
          <span className="material-symbols-outlined">checklist</span>
          <span className="text-[10px] font-extrabold uppercase tracking-widest">
            할 일
          </span>
        </div>
        <Link
          href="/calendar"
          className="flex flex-col items-center justify-center text-slate-400 hover:text-primary transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined">flag</span>
          <span className="text-[10px] font-extrabold uppercase tracking-widest">
            목표
          </span>
        </Link>
        <div className="flex flex-col items-center justify-center text-slate-400 hover:text-primary transition-transform active:scale-95">
          <span className="material-symbols-outlined">smart_toy</span>
          <span className="text-[10px] font-extrabold uppercase tracking-widest">
            브리핑
          </span>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-400 hover:text-primary transition-transform active:scale-95">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-extrabold uppercase tracking-widest">
            설정
          </span>
        </div>
      </nav>
    </>
  );
}
