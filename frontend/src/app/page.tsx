import Link from "next/link";

export default function DashboardPage() {
  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-slate-50 border-b border-slate-200 shadow-none transition-all duration-200 ease-in-out">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">menu</span>
          <h1 className="text-xl font-extrabold tracking-tight text-primary">Hierar-Do</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold tracking-tight text-primary">에이전트 브리핑</span>
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border border-indigo-200">
            <span className="material-symbols-outlined text-secondary text-base">person</span>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-24 px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-10">

          {/* Tier 1: Daily Tasks & System Intelligence */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-2xl text-primary border-l-4 border-primary pl-4">일일 체크리스트</h2>
                <span className="text-sm text-outline font-medium">오늘</span>
              </div>
              <div className="bg-white border border-outline-variant rounded-xl divide-y divide-slate-100 shadow-md">
                <label className="flex items-center gap-4 p-5 hover:bg-surface transition-colors cursor-pointer">
                  <input defaultChecked className="w-5 h-5 rounded border-outline text-primary-container focus:ring-primary" type="checkbox" />
                  <div className="flex-1">
                    <span className="text-base font-semibold line-through text-outline">오전 검토: 로그 분석</span>
                  </div>
                  <span className="text-[10px] text-outline">오전 09:00</span>
                </label>
                <label className="flex items-center gap-4 p-5 hover:bg-surface transition-colors cursor-pointer">
                  <input className="w-5 h-5 rounded border-outline text-primary-container focus:ring-primary" type="checkbox" />
                  <div className="flex-1">
                    <span className="text-base font-semibold">마이그레이션 문서 초안 작성</span>
                    <p className="text-xs text-outline">관련 항목: 주간 인프라 목표</p>
                  </div>
                  <span className="text-[10px] text-error font-extrabold">긴급</span>
                </label>
                <label className="flex items-center gap-4 p-5 hover:bg-surface transition-colors cursor-pointer">
                  <input className="w-5 h-5 rounded border-outline text-primary-container focus:ring-primary" type="checkbox" />
                  <div className="flex-1">
                    <span className="text-base font-semibold">제품 디자인 팀과 동기화</span>
                  </div>
                </label>
                <div className="p-4 bg-surface-container-low">
                  <button className="w-full py-3 border-2 border-dashed border-outline-variant rounded-lg text-sm text-outline font-semibold hover:text-primary hover:border-primary transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-sm">add</span>
                    할 일 추가
                  </button>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col justify-center">
              <div className="bg-primary text-on-primary p-card-padding rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="material-symbols-outlined text-6xl">smart_toy</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-lg">bolt</span>
                  <h4 className="text-[10px] uppercase tracking-[0.15em] text-white/70 font-bold">시스템 인텔리전스</h4>
                </div>
                <p className="text-lg leading-relaxed mb-6">
                  좋은 아침입니다!{" "}
                  <span className="underline decoration-white/30 font-bold">내부 툴링</span>{" "}
                  주간 마일스톤 달성을 순조롭게 진행 중입니다. 오늘 마이그레이션 문서를 완료하면 예정보다 4시간 앞당겨집니다.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/60 font-medium">마지막 업데이트: 5분 전</span>
                  <button className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full text-xs font-bold transition-colors">닫기</button>
                </div>
              </div>
            </div>
          </section>

          {/* Tier 2: Weekly Milestones */}
          <section className="relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-2xl text-primary">주간 마일스톤</h2>
              <span className="text-sm text-outline font-medium">45주차</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative pl-indent">
              <div className="stem-line" />

              <div className="relative">
                <div className="stem-connector" />
                <div className="bg-surface-container-lowest border border-outline-variant p-card-padding rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">진행 중</div>
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors cursor-pointer">more_horiz</span>
                  </div>
                  <h4 className="font-semibold text-lg text-on-surface mb-2">내부 툴링 업그레이드</h4>
                  <p className="text-sm text-on-surface-variant mb-4">지연 시간 개선을 위해 레거시 데이터베이스를 새로운 클라우드 인프라로 이전합니다.</p>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full border-2 border-surface-container-lowest bg-indigo-200 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[14px] text-primary">person</span>
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-surface-container-lowest bg-indigo-300 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[14px] text-primary">person</span>
                      </div>
                    </div>
                    <div className="h-1 flex-1 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-3/4" />
                    </div>
                    <span className="text-xs text-outline font-bold">75%</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="stem-connector" />
                <div className="bg-surface-container-lowest border border-outline-variant p-card-padding rounded-xl shadow-sm opacity-80 hover:opacity-100 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="px-2 py-0.5 rounded bg-surface-variant text-on-surface-variant text-[10px] font-bold">대기 중</div>
                  </div>
                  <h4 className="font-semibold text-lg text-on-surface mb-2">채용: 수석 아키텍트</h4>
                  <p className="text-sm text-on-surface-variant">최종 후보자 검토 및 DevOps 직무 제안 패키지 준비.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Tier 3: Monthly Goals */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-2xl text-primary">월간 목표</h2>
              <span className="text-xs font-bold bg-secondary-container text-on-secondary-container px-2 py-1 rounded">2023년 11월</span>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant p-card-padding rounded-xl relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-surface-container">
                <div className="h-full bg-primary w-[65%]" />
              </div>
              <div className="flex items-start gap-3 mb-4">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <h3 className="font-semibold text-lg text-primary">11월 중점 사항</h3>
              </div>
              <p className="text-base text-on-surface-variant mb-6">200% 성장을 지원하기 위한 운영 인프라 확장.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-surface border-l-4 border-primary">
                  <span className="material-symbols-outlined text-sm text-primary">target</span>
                  <span className="text-sm font-bold">핵심 전략 정렬</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg hover:bg-surface-container transition-colors border-l-4 border-transparent">
                  <span className="material-symbols-outlined text-sm text-outline">circle</span>
                  <span className="text-sm font-bold">4분기 재무 감사</span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-2 h-20 bg-white border-t border-slate-200">
        <div className="flex flex-col items-center justify-center bg-indigo-50 text-primary rounded-xl px-3 py-1 transition-transform active:scale-95">
          <span className="material-symbols-outlined">checklist</span>
          <span className="text-[10px] font-extrabold uppercase tracking-widest">할 일</span>
        </div>
        <Link href="/calendar" className="flex flex-col items-center justify-center text-slate-400 hover:text-primary transition-transform active:scale-95">
          <span className="material-symbols-outlined">flag</span>
          <span className="text-[10px] font-extrabold uppercase tracking-widest">목표</span>
        </Link>
        <div className="flex flex-col items-center justify-center text-slate-400 hover:text-primary transition-transform active:scale-95">
          <span className="material-symbols-outlined">smart_toy</span>
          <span className="text-[10px] font-extrabold uppercase tracking-widest">브리핑</span>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-400 hover:text-primary transition-transform active:scale-95">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-extrabold uppercase tracking-widest">설정</span>
        </div>
      </nav>
    </>
  );
}
