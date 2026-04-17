"use client";

import { useCallback, useRef, useEffect } from "react";
import { useAnalyzerStore } from "@/store/analyzerStore";
import type { AnalyzeRequest, AnalyzeResponse } from "@/types/analysis";

const LOADING_MESSAGES = [
  { icon: "📡", text: "Transmitting chart data securely..." },
  { icon: "🔭", text: "Scanning 1D macro trend structure..." },
  { icon: "🏛️", text: "Mapping 1H institutional order flow..." },
  { icon: "⚡", text: "Reading 5m entry momentum signals..." },
  { icon: "🧮", text: "Calculating confluence probability..." },
  { icon: "✍️", text: "Drafting trade rationale brief..." },
];

export { LOADING_MESSAGES };

export function useAnalysis() {
  const {
    selectedPair,
    images,
    setPhase,
    setResult,
    setError,
    setRawResponse,
    setLoadingMessageIndex,
    isReadyToAnalyze,
  } = useAnalyzerStore();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopLoadingMessages = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startLoadingMessages = useCallback(() => {
    let index = 0;
    setLoadingMessageIndex(0);
    intervalRef.current = setInterval(() => {
      index = (index + 1) % LOADING_MESSAGES.length;
      setLoadingMessageIndex(index);
    }, 2500);
  }, [setLoadingMessageIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopLoadingMessages();
  }, [stopLoadingMessages]);

  const analyze = useCallback(async () => {
    if (!isReadyToAnalyze() || !selectedPair) return;

    const img1D = images["1D"];
    const img1H = images["1H"];
    const img5M = images["5M"];
    if (!img1D || !img1H || !img5M) return;

    setPhase("loading");
    setError(null);
    setResult(null);
    setRawResponse(null);
    startLoadingMessages();

    try {
      const body: AnalyzeRequest = {
        pair: selectedPair,
        images: [img1D.base64, img1H.base64, img5M.base64],
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data: AnalyzeResponse = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Analysis failed. Please try again.");
        if (data.raw) setRawResponse(data.raw);
        setPhase("error");
      } else if (data.data) {
        setResult(data.data);
        setPhase("results");
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError(
          "Analysis timed out. The AI model is taking too long. Please try again."
        );
      } else {
        setError("Network error. Please check your connection and try again.");
      }
      setPhase("error");
    } finally {
      stopLoadingMessages();
    }
  }, [
    isReadyToAnalyze,
    selectedPair,
    images,
    setPhase,
    setError,
    setResult,
    setRawResponse,
    startLoadingMessages,
    stopLoadingMessages,
  ]);

  return { analyze, LOADING_MESSAGES };
}
