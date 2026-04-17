"use client";

import { Navbar } from "@/components/navbar/Navbar";
import { PairSelector } from "@/components/analyzer/PairSelector";
import { LivePrice } from "@/components/analyzer/LivePrice";
import { UploadPanel } from "@/components/analyzer/UploadPanel";
import { AnalyzeButton } from "@/components/analyzer/AnalyzeButton";
import { LoadingOverlay } from "@/components/analyzer/LoadingOverlay";
import { ResultsDashboard } from "@/components/results/ResultsDashboard";
import { useAnalyzerStore } from "@/store/analyzerStore";

export default function Home() {
  const phase = useAnalyzerStore((s) => s.phase) as string;
  const error = useAnalyzerStore((s) => s.error);
  const rawResponse = useAnalyzerStore((s) => s.rawResponse);
  const reset = useAnalyzerStore((s) => s.reset);
  const selectedPair = useAnalyzerStore((s) => s.selectedPair);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black/[0.02] dark:from-white/[0.02] via-transparent to-transparent pointer-events-none" />
      
      <Navbar />
      <LoadingOverlay />
      
      <main className="relative flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {phase === "results" ? (
          <ResultsDashboard />
        ) : (
          <div className="flex flex-col items-center gap-16">
            {/* Hero */}
            <div className="text-center space-y-6 max-w-3xl pt-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-black/60 dark:text-white/60 font-medium tracking-wide">
                  INSTITUTIONAL-GRADE ANALYSIS
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black dark:text-white tracking-tight leading-[1.1]">
                Multi-Timeframe
                <span className="block text-black/40 dark:text-white/40">Chart Analysis</span>
              </h1>
              <p className="text-black/50 dark:text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                Upload your 1D, 1H, and 5M charts. Our AI analyzes confluence 
                across timeframes to deliver probabilistic trade signals.
              </p>
            </div>

            {/* Steps Container */}
            <div className="w-full max-w-4xl space-y-12">
              {/* Step 1: Pair Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-bold flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-black dark:text-white">
                      Select Currency Pair
                    </span>
                    <p className="text-xs text-black/50 dark:text-white/40">Choose from majors, minors, or exotics</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <PairSelector />
                  <LivePrice pair={selectedPair} />
                </div>
              </div>

              {/* Step 2: Upload Charts */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-bold flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-black dark:text-white">
                      Upload Chart Screenshots
                    </span>
                    <p className="text-xs text-black/50 dark:text-white/40">Three timeframes for confluence analysis</p>
                  </div>
                </div>
                <UploadPanel />
              </div>

              {/* Step 3: Analyze */}
              <div className="flex flex-col items-center gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-bold flex items-center justify-center">
                    3
                  </div>
                  <span className="text-sm font-semibold text-black dark:text-white">
                    Generate Analysis
                  </span>
                </div>
                <AnalyzeButton />
              </div>
            </div>

            {/* Error State */}
            {phase === "error" && error && (
              <div className="w-full max-w-4xl rounded-2xl border border-red-500/20 bg-red-500/5 p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <span className="text-lg">✕</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-red-400">
                      Analysis Failed
                    </h3>
                    <p className="text-sm text-black/60 dark:text-white/60">{error}</p>
                  </div>
                </div>

                {rawResponse && (
                  <details className="mt-3">
                    <summary className="text-xs text-black/40 dark:text-white/40 cursor-pointer hover:text-black/60 dark:hover:text-white/60 transition-colors">
                      View raw AI response
                    </summary>
                    <pre className="mt-2 p-4 rounded-xl bg-black/10 dark:bg-black/50 text-xs text-black/60 dark:text-white/40 overflow-x-auto max-h-60 overflow-y-auto whitespace-pre-wrap border border-black/10 dark:border-white/5">
                      {rawResponse}
                    </pre>
                  </details>
                )}

                <button
                  onClick={reset}
                  className="text-sm text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-colors underline underline-offset-4"
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative w-full border-t border-black/10 dark:border-white/5 py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-black/40 dark:text-white/30">
            Forex Visual Analyzer — Not financial advice
          </p>
          <div className="flex items-center gap-6">
            <p className="text-xs text-black/40 dark:text-white/30">
              Powered by Claude Vision
            </p>
            <div className="h-3 w-px bg-black/10 dark:bg-white/10" />
            <p className="text-xs text-black/40 dark:text-white/30">
              © 2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
