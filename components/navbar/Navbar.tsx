"use client";

import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-black/80 backdrop-blur-xl sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-black dark:bg-white flex items-center justify-center text-sm font-black text-white dark:text-black tracking-tighter">
              FX
            </div>
            <div className="absolute -inset-1 bg-black/20 dark:bg-white/20 rounded-xl blur-md -z-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-black dark:text-white tracking-tight">
              Forex Analyzer
            </span>
            <span className="text-[10px] text-black/40 dark:text-white/40 uppercase tracking-[0.2em] font-medium">
              Multi-Timeframe AI
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-black/60 dark:text-white/60 font-medium">
              Claude Vision
            </span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
