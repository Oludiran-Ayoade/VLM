"use client";

import type { KeyLevels } from "@/types/analysis";

interface SupportResistanceProps {
  keyLevels: KeyLevels;
}

export function SupportResistance({ keyLevels }: SupportResistanceProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
          <span className="text-base">📍</span>
        </div>
        <h3 className="text-base font-semibold text-white">Key Levels</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Resistance */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <h4 className="text-xs font-medium text-red-400 uppercase tracking-wider">
              Resistance
            </h4>
          </div>
          <div className="space-y-2 pl-4">
            {keyLevels.resistance.map((level, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-sm text-white/70 py-1.5 px-3 rounded-lg bg-white/[0.02] border border-white/5"
              >
                <span className="text-white/30 text-xs font-mono">R{i + 1}</span>
                <span>{level}</span>
              </div>
            ))}
            {keyLevels.resistance.length === 0 && (
              <p className="text-xs text-white/30 italic">No levels identified</p>
            )}
          </div>
        </div>

        {/* Support */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <h4 className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
              Support
            </h4>
          </div>
          <div className="space-y-2 pl-4">
            {keyLevels.support.map((level, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-sm text-white/70 py-1.5 px-3 rounded-lg bg-white/[0.02] border border-white/5"
              >
                <span className="text-white/30 text-xs font-mono">S{i + 1}</span>
                <span>{level}</span>
              </div>
            ))}
            {keyLevels.support.length === 0 && (
              <p className="text-xs text-white/30 italic">No levels identified</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
