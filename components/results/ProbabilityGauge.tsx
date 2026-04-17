"use client";

import type { Direction } from "@/types/analysis";

interface ProbabilityGaugeProps {
  probability: number;
  direction: Direction;
}

export function ProbabilityGauge({
  probability,
  direction,
}: ProbabilityGaugeProps) {
  const radius = 90;
  const strokeWidth = 8;
  const center = 110;
  const startAngle = Math.PI;
  const totalAngle = Math.PI;
  const progressAngle = startAngle - (probability / 100) * totalAngle;

  const describeArc = (
    cx: number,
    cy: number,
    r: number,
    start: number,
    end: number
  ) => {
    const x1 = cx + r * Math.cos(start);
    const y1 = cy - r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy - r * Math.sin(end);
    const largeArc = start - end > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  const getDirectionStyle = () => {
    if (direction === "Bullish") return { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" };
    if (direction === "Bearish") return { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20" };
    return { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" };
  };

  const style = getDirectionStyle();

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="220" height="130" viewBox="0 220 220 130">
          {/* Background arc */}
          <path
            d={describeArc(center, 340, radius, startAngle, 0)}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Progress arc */}
          {probability > 0 && (
            <path
              d={describeArc(center, 340, radius, startAngle, progressAngle)}
              fill="none"
              stroke="white"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0 0 12px rgba(255,255,255,0.3))",
              }}
            />
          )}
          {/* Center percentage */}
          <text
            x={center}
            y="320"
            textAnchor="middle"
            fill="white"
            fontSize="48"
            fontWeight="700"
            fontFamily="system-ui"
          >
            {probability}
          </text>
          <text
            x={center}
            y="345"
            textAnchor="middle"
            fill="rgba(255,255,255,0.4)"
            fontSize="14"
            fontWeight="500"
          >
            PROBABILITY
          </text>
        </svg>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full pointer-events-none" />
      </div>
      
      {/* Direction badge */}
      <div className={`mt-4 px-6 py-2 rounded-full text-sm font-semibold border ${style.bg} ${style.text} ${style.border}`}>
        {direction}
      </div>
    </div>
  );
}
