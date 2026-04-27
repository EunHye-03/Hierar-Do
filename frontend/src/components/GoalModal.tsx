// frontend/src/components/GoalModal.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useCreateGoal } from "@/lib/queries";

interface GoalModalProps {
  onClose: () => void;
}

export function GoalModal({ onClose }: GoalModalProps) {
  const [rawInput, setRawInput] = useState("");
  const [weekday, setWeekday] = useState(2);
  const [weekend, setWeekend] = useState(4);
  const backdropRef = useRef<HTMLDivElement>(null);

  const { mutate: createGoal, isPending, isError } = useCreateGoal(onClose);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === backdropRef.current) onClose();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rawInput.trim()) return;
    createGoal({
      raw_input: rawInput.trim(),
      available_hours: { weekday, weekend },
    });
  }

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col gap-5">
        <h2 className="text-xl font-extrabold text-primary">새 목표 만들기</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="raw-input" className="text-sm font-semibold text-on-surface-variant">
              목표를 자유롭게 입력하세요
            </label>
            <textarea
              id="raw-input"
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              placeholder="예: 이번 달 안에 토익 900점 받고 싶어"
              rows={3}
              className="border border-outline-variant rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="weekday-hours" className="text-sm font-semibold text-on-surface-variant">
                평일 시간 (시간/일)
              </label>
              <input
                id="weekday-hours"
                type="number"
                min={1}
                max={12}
                value={weekday}
                onChange={(e) => setWeekday(Math.min(12, Math.max(1, Number(e.target.value))))}
                className="border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="weekend-hours" className="text-sm font-semibold text-on-surface-variant">
                주말 시간 (시간/일)
              </label>
              <input
                id="weekend-hours"
                type="number"
                min={1}
                max={12}
                value={weekend}
                onChange={(e) => setWeekend(Math.min(12, Math.max(1, Number(e.target.value))))}
                className="border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending || !rawInput.trim()}
            className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            {isPending ? "생성 중..." : "목표 생성"}
          </button>

          {isError && (
            <p className="text-sm text-error text-center">
              목표 생성 중 오류가 발생했어요. 다시 시도해 주세요.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
