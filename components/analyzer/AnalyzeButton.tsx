"use client";

import { useAnalyzerStore } from "@/store/analyzerStore";
import { useAnalysis } from "@/hooks/useAnalysis";

export function AnalyzeButton() {
  const isReady = useAnalyzerStore((s) => s.isReadyToAnalyze());
  const phase = useAnalyzerStore((s) => s.phase) as string;
  const { analyze } = useAnalysis();

  const isLoading = phase === "loading";
  const isDisabled = !isReady || isLoading;

  return (
    <div className="relative group">
      {/* Glow effect */}
      {!isDisabled && !isLoading && (
        <div className="absolute -inset-1 bg-black/20 dark:bg-white/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      
      <button
        onClick={analyze}
        disabled={isDisabled}
        className={`
          relative w-full min-w-[280px] h-14 rounded-xl font-semibold text-base
          transition-all duration-300 overflow-hidden
          ${
            isDisabled
              ? "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-white/30 cursor-not-allowed border border-gray-200 dark:border-white/5"
              : "bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10 dark:shadow-white/10"
          }
        `}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-3">
            <svg
              className="animate-spin h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>Analyzing...</span>
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <span>Analyze Charts</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        )}
        
        {/* Shimmer effect */}
        {!isDisabled && !isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
        )}
      </button>
    </div>
  );
}
