"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FOREX_PAIRS, type ForexPairGroup } from "@/lib/forex-pairs";
import { useAnalyzerStore } from "@/store/analyzerStore";

export function PairSelector() {
  const selectedPair = useAnalyzerStore((s) => s.selectedPair);
  const setSelectedPair = useAnalyzerStore((s) => s.setSelectedPair);

  return (
    <div className="w-full max-w-md">
      <Select value={selectedPair ?? ""} onValueChange={setSelectedPair}>
        <SelectTrigger className="w-full bg-white/[0.03] border-white/10 text-white h-14 text-base hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 cursor-pointer rounded-xl focus:ring-2 focus:ring-white/20 focus:ring-offset-0">
          <SelectValue placeholder="Choose currency pair..." />
        </SelectTrigger>
        <SelectContent className="bg-black/95 backdrop-blur-xl border-white/10 rounded-xl shadow-2xl">
          {(Object.keys(FOREX_PAIRS) as ForexPairGroup[]).map((group) => (
            <SelectGroup key={group}>
              <SelectLabel className="text-white/30 text-[10px] uppercase tracking-[0.15em] px-3 py-2 font-semibold">
                {group}
              </SelectLabel>
              {FOREX_PAIRS[group].map((pair) => (
                <SelectItem
                  key={pair}
                  value={pair}
                  className="text-white/80 cursor-pointer focus:bg-white/10 focus:text-white rounded-lg mx-1 transition-colors"
                >
                  <span className="font-mono font-medium">{pair}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
