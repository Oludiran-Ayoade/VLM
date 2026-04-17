"use client";

import { useAnalyzerStore } from "@/store/analyzerStore";
import { ProbabilityGauge } from "./ProbabilityGauge";
import { TimeframeCard } from "./TimeframeCard";
import { RationaleSection } from "./RationaleSection";
import { SupportResistance } from "./SupportResistance";
import { RiskWarning } from "./RiskWarning";

export function ResultsDashboard() {
  const result = useAnalyzerStore((s) => s.result);
  const selectedPair = useAnalyzerStore((s) => s.selectedPair);
  const reset = useAnalyzerStore((s) => s.reset);

  if (!result) return null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs text-white/60 font-medium tracking-wide">
            ANALYSIS COMPLETE
          </span>
        </div>
        <h2 className="text-3xl font-bold text-white">
          {selectedPair}
        </h2>
        <p className="text-white/40">Multi-Timeframe Confluence Analysis</p>
      </div>

      {/* Probability Gauge */}
      <div className="flex justify-center py-6">
        <ProbabilityGauge
          probability={result.probability}
          direction={result.direction}
        />
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Timeframe Analysis Cards */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-white/5" />
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em]">
            Timeframe Breakdown
          </h3>
          <div className="h-px flex-1 bg-white/5" />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <TimeframeCard
            icon="🔭"
            title="1-Day Analysis"
            subtitle="Macro Trend"
            analysis={result.daily_analysis}
          />
          <TimeframeCard
            icon="🏛️"
            title="1-Hour Analysis"
            subtitle="Market Structure"
            analysis={result.hourly_analysis}
          />
          <TimeframeCard
            icon="⚡"
            title="5-Minute Analysis"
            subtitle="Entry Signal"
            analysis={result.entry_analysis}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Decision Rationale */}
      <RationaleSection
        rationale={result.decision_rationale}
        invalidation={result.invalidation_condition}
      />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Key Levels */}
      <SupportResistance keyLevels={result.key_levels} />

      {/* Risk Warning */}
      <RiskWarning
        warning={result.risk_warning}
        confidenceLevel={result.confidence_level}
      />

      {/* Reset Button */}
      <div className="flex justify-center pt-6 pb-10">
        <button
          onClick={reset}
          className="group relative px-8 py-3.5 rounded-xl border border-white/10 bg-white/[0.02] text-white text-sm font-medium hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            <svg className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Analyze Another Pair
          </span>
        </button>
      </div>
    </div>
  );
}
