import Link from "next/link";

export default function CalendarDashboardPage() {
  return (
    <>
      {/* TopAppBar */}
      <header className="flex items-center justify-between px-6 py-4 w-full h-16 bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-900">account_tree</span>
          <h1 className="text-lg font-bold text-indigo-900 tracking-tight">Hierar-Do</h1>
        </div>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-slate-400 hover:opacity-80 transition-opacity cursor-pointer">search</span>
          <span className="material-symbols-outlined text-slate-400 hover:opacity-80 transition-opacity cursor-pointer">notifications</span>
        </div>
      </header>

      <main className="max-w-[1024px] mx-auto px-4 py-6 mb-24">

        {/* Calendar Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-2xl text-primary">2024년 5월</h2>
            <span className="material-symbols-outlined text-outline">calendar_month</span>
          </div>
          <div className="bg-white border border-outline-variant p-4 rounded-xl shadow-sm">
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                <span key={day} className="text-xs font-bold text-outline uppercase">{day}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              <div className="py-2 text-sm text-outline-variant">12</div>
              <div className="py-2 text-sm text-outline-variant">13</div>
              <div className="py-2 text-sm bg-primary-container text-on-primary-container rounded-lg font-bold">14</div>
              <div className="py-2 text-sm text-on-surface">15</div>
              <div className="py-2 text-sm text-on-surface">16</div>
              <div className="py-2 text-sm text-on-surface">17</div>
              <div className="py-2 text-sm text-on-surface">18</div>
            </div>
          </div>
        </section>

        {/* System Briefing Card */}
        <section className="mb-8">
          <div className="bg-primary-container text-white p-card-padding rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-[80px]">psychology</span>
            </div>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined">auto_awesome</span>
              시스템 브리핑
            </h3>
            <p className="text-sm opacity-90 leading-relaxed">
              오늘 해결해야 할 핵심 과업은 5개입니다.<br />
              오전 10시 <strong className="font-bold">{'\'전략 기획서 검토\''}</strong>가 가장 높은 우선순위로 할당되었습니다.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold">생산성 92%</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold">잔여 과업 12</span>
            </div>
          </div>
        </section>

        {/* Today's Focus */}
        <section className="mb-8">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest">CURRENT FOCUS</span>
              <h2 className="font-bold text-2xl text-on-surface">오늘의 할 일</h2>
            </div>
            <button className="flex items-center gap-1 text-primary font-bold text-sm">
              <span className="material-symbols-outlined text-sm">add_circle</span>
              추가
            </button>
          </div>

          <div className="space-y-4">
            {/* Task with subtasks */}
            <div className="relative">
              <div className="bg-white border border-outline-variant p-card-padding rounded-xl relative z-10 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="mt-1">
                  <span className="material-symbols-outlined text-primary cursor-pointer">check_box_outline_blank</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-lg text-on-surface">분기 실적 보고서 작성</h4>
                    <span className="text-xs font-bold text-error bg-error-container/30 px-2 py-0.5 rounded">높음</span>
                  </div>
                  <p className="text-sm text-secondary mt-1">오전 11:00 마감 • 업무 시스템</p>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-secondary mb-1 font-semibold">
                      <span>진행률</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[60%]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="connection-line border-l border-slate-200" />
              <div className="ml-indent mt-4 space-y-3">
                <div className="bg-white border border-slate-100 p-4 rounded-lg flex items-center gap-3 relative z-10">
                  <span className="material-symbols-outlined text-secondary text-[20px]">check_box</span>
                  <span className="text-sm text-outline line-through">데이터 수집 및 정제</span>
                </div>
                <div className="bg-white border border-slate-100 p-4 rounded-lg flex items-center gap-3 relative z-10">
                  <span className="material-symbols-outlined text-primary text-[20px]">check_box_outline_blank</span>
                  <span className="text-sm text-on-surface font-semibold">그래프 시각화 모듈 생성</span>
                </div>
              </div>
            </div>

            {/* Simple task */}
            <div className="bg-white border border-outline-variant p-card-padding rounded-xl flex items-center gap-4 shadow-sm">
              <span className="material-symbols-outlined text-primary">check_box_outline_blank</span>
              <div className="flex-1">
                <h4 className="font-semibold text-lg text-on-surface">팀 주간 미팅 준비</h4>
                <p className="text-sm text-secondary">오후 2:00 • 회의실 A</p>
              </div>
              <span className="material-symbols-outlined text-outline">chevron_right</span>
            </div>
          </div>
        </section>

        {/* Milestones & Goals Quick Links */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="bg-white border border-outline-variant p-5 rounded-xl flex justify-between items-center group cursor-pointer hover:bg-surface-container transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">ads_click</span>
              <div>
                <h5 className="font-bold text-base">주간 마일스톤</h5>
                <p className="text-xs text-secondary">3개 활성화 중</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
          </div>
          <div className="bg-white border border-outline-variant p-5 rounded-xl flex justify-between items-center group cursor-pointer hover:bg-surface-container transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">flag</span>
              <div>
                <h5 className="font-bold text-base">월간 목표</h5>
                <p className="text-xs text-secondary">전체 달성률 45%</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
          </div>
        </section>

      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 h-20 bg-white/95 border-t border-slate-100 shadow-sm backdrop-blur-md">
        <Link href="/" className="flex flex-col items-center justify-center text-indigo-900 font-bold transition-colors duration-200">
          <span className="material-symbols-outlined">calendar_today</span>
          <span className="text-[11px] font-bold mt-1">할 일</span>
        </Link>
        <a href="#" className="flex flex-col items-center justify-center text-slate-400 hover:text-indigo-700 transition-colors duration-200">
          <span className="material-symbols-outlined">ads_click</span>
          <span className="text-[11px] font-bold mt-1">목표</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-slate-400 hover:text-indigo-700 transition-colors duration-200">
          <span className="material-symbols-outlined">analytics</span>
          <span className="text-[11px] font-bold mt-1">브리핑</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-slate-400 hover:text-indigo-700 transition-colors duration-200">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[11px] font-bold mt-1">설정</span>
        </a>
      </nav>

      {/* FAB */}
      <button className="fixed right-6 bottom-24 w-14 h-14 bg-indigo-900 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-95 duration-150 active:scale-90 z-40">
        <span className="material-symbols-outlined">add</span>
      </button>
    </>
  );
}
