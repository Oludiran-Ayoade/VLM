"use client";

interface TimeframeCardProps {
  icon: string;
  title: string;
  subtitle: string;
  analysis: string;
}

export function TimeframeCard({
  icon,
  title,
  subtitle,
  analysis,
}: TimeframeCardProps) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">{title}</h3>
            <span className="text-[10px] text-white/30 uppercase tracking-wider font-medium px-2 py-1 rounded-full bg-white/5">
              {subtitle}
            </span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            {analysis}
          </p>
        </div>
      </div>
    </div>
  );
}
