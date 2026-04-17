"use client";

import type { TradeSetup as TradeSetupType } from "@/types/analysis";

interface TradeSetupProps {
  setup: TradeSetupType;
  direction: "Bullish" | "Bearish" | "Neutral";
}

export function TradeSetup({ setup, direction }: TradeSetupProps) {
  const isBullish = direction === "Bullish";
  const isBearish = direction === "Bearish";

  const getOrderTypeStyle = () => {
    if (setup.order_type.includes("Buy")) {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }
    if (setup.order_type.includes("Sell")) {
      return "bg-red-500/10 text-red-400 border-red-500/20";
    }
    return "bg-white/10 text-white/60 border-white/20";
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <span className="text-xl">🎯</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Trade Setup</h3>
              <p className="text-xs text-white/40">Actionable entry parameters</p>
            </div>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getOrderTypeStyle()}`}>
            {setup.order_type}
          </span>
        </div>
      </div>

      {/* Main Trade Levels */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Entry & SL */}
          <div className="space-y-4">
            {/* Entry Price */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/40 uppercase tracking-wider font-medium">Entry Price</span>
                <div className={`w-3 h-3 rounded-full ${isBullish ? "bg-emerald-400" : isBearish ? "bg-red-400" : "bg-amber-400"}`} />
              </div>
              <p className="text-2xl font-bold text-white font-mono">{setup.entry_price}</p>
              <p className="text-xs text-white/50 mt-2 leading-relaxed">{setup.entry_reasoning}</p>
            </div>

            {/* Stop Loss */}
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-red-400 uppercase tracking-wider font-medium">Stop Loss</span>
                <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-red-400 font-mono">{setup.stop_loss}</p>
              <p className="text-xs text-white/50 mt-2 leading-relaxed">{setup.sl_reasoning}</p>
            </div>
          </div>

          {/* Right Column - Take Profits */}
          <div className="space-y-4">
            {/* TP1 */}
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-emerald-400 uppercase tracking-wider font-medium">Take Profit 1</span>
                <span className="text-[10px] text-emerald-400/60 bg-emerald-500/10 px-2 py-0.5 rounded-full">50% Position</span>
              </div>
              <p className="text-xl font-bold text-emerald-400 font-mono">{setup.take_profit_1}</p>
            </div>

            {/* TP2 */}
            <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-emerald-400/80 uppercase tracking-wider font-medium">Take Profit 2</span>
                <span className="text-[10px] text-emerald-400/50 bg-emerald-500/10 px-2 py-0.5 rounded-full">30% Position</span>
              </div>
              <p className="text-xl font-bold text-emerald-400/80 font-mono">{setup.take_profit_2}</p>
            </div>

            {/* TP3 */}
            <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-emerald-400/60 uppercase tracking-wider font-medium">Take Profit 3</span>
                <span className="text-[10px] text-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 rounded-full">20% Position</span>
              </div>
              <p className="text-xl font-bold text-emerald-400/60 font-mono">{setup.take_profit_3}</p>
            </div>
          </div>
        </div>

        {/* TP Reasoning */}
        <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <p className="text-xs text-white/40 uppercase tracking-wider font-medium mb-2">TP Reasoning</p>
          <p className="text-sm text-white/60 leading-relaxed">{setup.tp_reasoning}</p>
        </div>

        {/* Risk:Reward & Position Size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {/* Risk:Reward */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-xs text-white/40 uppercase tracking-wider font-medium">Risk:Reward</span>
            </div>
            <p className="text-lg font-semibold text-white">{setup.risk_reward_ratio}</p>
          </div>

          {/* Position Size */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-white/40 uppercase tracking-wider font-medium">Position Size</span>
            </div>
            <p className="text-sm font-medium text-white/80">{setup.position_size_recommendation}</p>
          </div>
        </div>
      </div>

      {/* Visual Trade Ladder */}
      <div className="px-6 pb-6">
        <div className="rounded-xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-white/40 uppercase tracking-wider font-medium mb-4 text-center">Trade Visualization</p>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-white/20 to-red-500/50" />
            
            {/* TP3 */}
            <div className="relative flex items-center justify-between py-2">
              <div className="w-5/12 text-right pr-4">
                <span className="text-xs text-emerald-400/60 font-mono">{setup.take_profit_3.split(' ')[0]}</span>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-500/40 border-2 border-emerald-500/60" />
              <div className="w-5/12 pl-4">
                <span className="text-[10px] text-white/30">TP3 (20%)</span>
              </div>
            </div>

            {/* TP2 */}
            <div className="relative flex items-center justify-between py-2">
              <div className="w-5/12 text-right pr-4">
                <span className="text-xs text-emerald-400/80 font-mono">{setup.take_profit_2.split(' ')[0]}</span>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-500/60 border-2 border-emerald-500/80" />
              <div className="w-5/12 pl-4">
                <span className="text-[10px] text-white/40">TP2 (30%)</span>
              </div>
            </div>

            {/* TP1 */}
            <div className="relative flex items-center justify-between py-2">
              <div className="w-5/12 text-right pr-4">
                <span className="text-xs text-emerald-400 font-mono">{setup.take_profit_1.split(' ')[0]}</span>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-emerald-400" />
              <div className="w-5/12 pl-4">
                <span className="text-[10px] text-emerald-400/80">TP1 (50%)</span>
              </div>
            </div>

            {/* Entry */}
            <div className="relative flex items-center justify-between py-3 my-2">
              <div className="w-5/12 text-right pr-4">
                <span className="text-sm text-white font-mono font-bold">{setup.entry_price.split(' ')[0]}</span>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-white shadow-lg shadow-white/20" />
              <div className="w-5/12 pl-4">
                <span className="text-xs text-white font-medium">ENTRY</span>
              </div>
            </div>

            {/* Stop Loss */}
            <div className="relative flex items-center justify-between py-2">
              <div className="w-5/12 text-right pr-4">
                <span className="text-xs text-red-400 font-mono">{setup.stop_loss.split(' ')[0]}</span>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 border-2 border-red-400" />
              <div className="w-5/12 pl-4">
                <span className="text-[10px] text-red-400">STOP LOSS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
