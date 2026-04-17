"use client";

import { useState, useEffect, useCallback } from "react";
import type { ForexPrice } from "@/lib/forex-prices";

interface UseRealtimePriceResult {
  price: ForexPrice | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useRealtimePrice(pair: string | null): UseRealtimePriceResult {
  const [price, setPrice] = useState<ForexPrice | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrice = useCallback(async () => {
    if (!pair) {
      setPrice(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/price?pair=${encodeURIComponent(pair)}`);
      const data = await response.json();

      if (data.success && data.price) {
        setPrice(data.price);
      } else {
        setError(data.error || "Failed to fetch price");
      }
    } catch (err) {
      setError("Network error fetching price");
    } finally {
      setLoading(false);
    }
  }, [pair]);

  useEffect(() => {
    fetchPrice();

    // Refresh price every 30 seconds
    const interval = setInterval(fetchPrice, 30000);

    return () => clearInterval(interval);
  }, [fetchPrice]);

  return { price, loading, error, refresh: fetchPrice };
}
