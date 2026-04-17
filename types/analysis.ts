export type Direction = "Bullish" | "Bearish" | "Neutral";

export type ConfidenceLevel = "Low" | "Medium" | "High";

export type Timeframe = "1D" | "1H" | "5M";

export interface KeyLevels {
  resistance: string[];
  support: string[];
}

export interface AnalysisResult {
  direction: Direction;
  probability: number;
  confidence_level: ConfidenceLevel;
  daily_analysis: string;
  hourly_analysis: string;
  entry_analysis: string;
  decision_rationale: string;
  key_levels: KeyLevels;
  invalidation_condition: string;
  risk_warning: string;
}

export interface UploadedImage {
  file: File;
  preview: string;
  base64: string;
  timeframe: Timeframe;
}

export interface AnalyzeRequest {
  pair: string;
  images: string[]; // base64 strings in order: [1D, 1H, 5M]
}

export interface AnalyzeResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
  raw?: string;
}

export interface TimeframeConfig {
  id: Timeframe;
  label: string;
  description: string;
  icon: string;
}

export const TIMEFRAME_CONFIGS: TimeframeConfig[] = [
  {
    id: "1D",
    label: "1-Day Chart",
    description: "Macro Trend",
    icon: "🔭",
  },
  {
    id: "1H",
    label: "1-Hour Chart",
    description: "Market Structure",
    icon: "🏛️",
  },
  {
    id: "5M",
    label: "5-Minute Chart",
    description: "Entry Signal",
    icon: "⚡",
  },
];
