"use client";

import { useAnalyzerStore } from "@/store/analyzerStore";
import { LOADING_MESSAGES } from "@/hooks/useAnalysis";

export function LoadingOverlay() {
  const phase = useAnalyzerStore((s) => s.phase);
  const messageIndex = useAnalyzerStore((s) => s.loadingMessageIndex);

  if (phase !== "loading") return null;

  const current = LOADING_MESSAGES[messageIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl">
      <div className="flex flex-col items-center gap-10 p-8 max-w-lg text-center">
        {/* Elegant spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center">
            {/* Middle ring */}
            <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center">
              {/* Inner content */}
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <span className="text-4xl">{current.icon}</span>
              </div>
            </div>
          </div>
          {/* Spinning ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white animate-spin" />
          {/* Glow */}
          <div className="absolute inset-4 rounded-full bg-white/5 blur-xl" />
        </div>

        {/* Message */}
        <div className="space-y-3">
          <p className="text-xl font-medium text-white transition-all duration-500">
            {current.text}
          </p>
          <p className="text-sm text-white/40">
            This typically takes 15–30 seconds
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((messageIndex + 1) / LOADING_MESSAGES.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-white/30 uppercase tracking-wider">Analyzing</span>
            <span className="text-[10px] text-white/30">{messageIndex + 1}/{LOADING_MESSAGES.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
