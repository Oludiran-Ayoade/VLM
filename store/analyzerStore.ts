import { create } from "zustand";
import type {
  AnalysisResult,
  Timeframe,
  UploadedImage,
} from "@/types/analysis";

export type AppPhase = "input" | "loading" | "results" | "error";

interface AnalyzerState {
  // Selection
  selectedPair: string | null;
  setSelectedPair: (pair: string | null) => void;

  // Images
  images: Record<Timeframe, UploadedImage | null>;
  setImage: (timeframe: Timeframe, image: UploadedImage | null) => void;
  clearImages: () => void;

  // Analysis
  phase: AppPhase;
  setPhase: (phase: AppPhase) => void;
  result: AnalysisResult | null;
  setResult: (result: AnalysisResult | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
  rawResponse: string | null;
  setRawResponse: (raw: string | null) => void;

  // Loading
  loadingMessageIndex: number;
  setLoadingMessageIndex: (index: number) => void;

  // Computed
  isReadyToAnalyze: () => boolean;

  // Actions
  reset: () => void;
}

const initialImages: Record<Timeframe, UploadedImage | null> = {
  "1D": null,
  "1H": null,
  "5M": null,
};

export const useAnalyzerStore = create<AnalyzerState>((set, get) => ({
  selectedPair: null,
  setSelectedPair: (pair) => set({ selectedPair: pair }),

  images: { ...initialImages },
  setImage: (timeframe, image) =>
    set((state) => ({
      images: { ...state.images, [timeframe]: image },
    })),
  clearImages: () => set({ images: { ...initialImages } }),

  phase: "input",
  setPhase: (phase) => set({ phase }),
  result: null,
  setResult: (result) => set({ result }),
  error: null,
  setError: (error) => set({ error }),
  rawResponse: null,
  setRawResponse: (raw) => set({ rawResponse: raw }),

  loadingMessageIndex: 0,
  setLoadingMessageIndex: (index) => set({ loadingMessageIndex: index }),

  isReadyToAnalyze: () => {
    const state = get();
    return (
      state.selectedPair !== null &&
      state.images["1D"] !== null &&
      state.images["1H"] !== null &&
      state.images["5M"] !== null
    );
  },

  reset: () =>
    set({
      selectedPair: null,
      images: { ...initialImages },
      phase: "input",
      result: null,
      error: null,
      rawResponse: null,
      loadingMessageIndex: 0,
    }),
}));
