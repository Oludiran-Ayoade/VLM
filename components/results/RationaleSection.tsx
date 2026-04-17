"use client";

interface RationaleSectionProps {
  rationale: string;
  invalidation: string;
}

export function RationaleSection({
  rationale,
  invalidation,
}: RationaleSectionProps) {
  return (
    <div className="space-y-6">
      {/* Main rationale */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <span className="text-xl">🧠</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              Decision Rationale
            </h3>
            <p className="text-xs text-white/40">Cross-timeframe confluence analysis</p>
          </div>
        </div>

        {/* Timeline visualization */}
        <div className="flex items-center gap-3 mb-6 text-xs overflow-x-auto pb-2">
          <div className="shrink-0 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
            <span className="text-white/80">🔭 1D Context</span>
          </div>
          <svg className="w-4 h-4 text-white/20 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <div className="shrink-0 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
            <span className="text-white/80">🏛️ 1H Setup</span>
          </div>
          <svg className="w-4 h-4 text-white/20 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <div className="shrink-0 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
            <span className="text-white/80">⚡ 5M Trigger</span>
          </div>
          <svg className="w-4 h-4 text-white/20 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <div className="shrink-0 px-3 py-2 rounded-lg bg-white/10 border border-white/20">
            <span className="text-white font-medium">🎯 Conclusion</span>
          </div>
        </div>

        {/* Rationale text */}
        <blockquote className="border-l-2 border-white/20 pl-5 text-sm text-white/70 leading-relaxed italic">
          &ldquo;{rationale}&rdquo;
        </blockquote>
      </div>

      {/* Invalidation alert */}
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-red-400 mb-1">
              Invalidation Condition
            </h4>
            <p className="text-sm text-white/50 leading-relaxed">
              {invalidation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
