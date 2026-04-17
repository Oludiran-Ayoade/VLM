"use client";

import { useRealtimePrice } from "@/hooks/useRealtimePrice";
import { formatPrice } from "@/lib/forex-prices";

interface LivePriceProps {
  pair: string | null;
}

export function LivePrice({ pair }: LivePriceProps) {
  const { price, loading, error, refresh } = useRealtimePrice(pair);

  if (!pair) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-white/40 uppercase tracking-wider font-medium">
            Live Price
          </span>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="text-xs text-white/40 hover:text-white/60 transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "↻"}
        </button>
      </div>

      {error ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : price ? (
        <div className="space-y-2">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-white font-mono">
              {formatPrice(price.bid, pair)}
            </span>
            <span className="text-xs text-white/40">
              / {formatPrice(price.ask, pair)}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-white/40">
              Spread: <span className="text-white/60">{price.spread} pips</span>
            </span>
            <span className="text-white/30">
              {new Date(price.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>
      ) : loading ? (
        <div className="h-10 bg-white/5 rounded animate-pulse" />
      ) : null}
    </div>
  );
}
