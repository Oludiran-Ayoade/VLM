"use client";

import { TIMEFRAME_CONFIGS } from "@/types/analysis";
import { UploadZone } from "./UploadZone";

export function UploadPanel() {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-[#E8E8F0] mb-3">
        Chart Screenshots
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TIMEFRAME_CONFIGS.map((config) => (
          <UploadZone key={config.id} config={config} />
        ))}
      </div>
    </div>
  );
}
