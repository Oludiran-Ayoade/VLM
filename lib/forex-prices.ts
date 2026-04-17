/**
 * Real-time Forex Price Integration
 * Uses free APIs for live currency prices
 */

export interface ForexPrice {
  pair: string;
  bid: number;
  ask: number;
  spread: number;
  timestamp: string;
  change24h?: number;
  changePercent24h?: number;
  high24h?: number;
  low24h?: number;
}

export interface PriceResponse {
  success: boolean;
  price?: ForexPrice;
  error?: string;
}

/**
 * Fetch real-time price for a currency pair
 * Uses multiple free APIs with fallback
 */
export async function getRealtimePrice(pair: string): Promise<PriceResponse> {
  // Convert pair format: "EUR/USD" -> "EURUSD"
  const symbol = pair.replace("/", "");
  const [base, quote] = pair.split("/");

  // Try primary API: ExchangeRate-API (free tier: 1500 requests/month)
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${base}`,
      { next: { revalidate: 60 } } // Cache for 1 minute
    );

    if (response.ok) {
      const data = await response.json();
      const rate = data.rates[quote];

      if (rate) {
        // Simulate bid/ask spread (typical for major pairs: 1-2 pips)
        const spreadPips = getTypicalSpread(pair);
        const pipValue = getPipValue(pair);
        const spread = spreadPips * pipValue;

        return {
          success: true,
          price: {
            pair,
            bid: rate,
            ask: rate + spread,
            spread: spreadPips,
            timestamp: new Date().toISOString(),
          },
        };
      }
    }
  } catch (error) {
    console.warn("Primary price API failed, trying fallback:", error);
  }

  // Fallback API: Frankfurter (free, no API key)
  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?from=${base}&to=${quote}`,
      { next: { revalidate: 60 } }
    );

    if (response.ok) {
      const data = await response.json();
      const rate = data.rates[quote];

      if (rate) {
        const spreadPips = getTypicalSpread(pair);
        const pipValue = getPipValue(pair);
        const spread = spreadPips * pipValue;

        return {
          success: true,
          price: {
            pair,
            bid: rate,
            ask: rate + spread,
            spread: spreadPips,
            timestamp: new Date().toISOString(),
          },
        };
      }
    }
  } catch (error) {
    console.warn("Fallback price API failed:", error);
  }

  return {
    success: false,
    error: "Unable to fetch real-time price. Please check your connection.",
  };
}

/**
 * Get multiple prices at once
 */
export async function getMultiplePrices(
  pairs: string[]
): Promise<Map<string, ForexPrice>> {
  const prices = new Map<string, ForexPrice>();

  await Promise.all(
    pairs.map(async (pair) => {
      const result = await getRealtimePrice(pair);
      if (result.success && result.price) {
        prices.set(pair, result.price);
      }
    })
  );

  return prices;
}

/**
 * Get typical spread for a pair (in pips)
 */
function getTypicalSpread(pair: string): number {
  const spreads: Record<string, number> = {
    "EUR/USD": 1.0,
    "GBP/USD": 1.2,
    "USD/JPY": 1.0,
    "USD/CHF": 1.5,
    "AUD/USD": 1.2,
    "USD/CAD": 1.5,
    "NZD/USD": 1.8,
    "EUR/GBP": 1.5,
    "EUR/JPY": 1.5,
    "GBP/JPY": 2.0,
    "EUR/AUD": 2.5,
    "GBP/AUD": 3.0,
    "EUR/CAD": 2.5,
    "GBP/NZD": 4.0,
    "USD/ZAR": 15.0,
    "USD/TRY": 20.0,
    "USD/MXN": 10.0,
    "EUR/TRY": 25.0,
    "GBP/ZAR": 20.0,
    "USD/SGD": 2.0,
    "USD/HKD": 2.0,
    "AUD/JPY": 2.0,
  };

  return spreads[pair] || 2.0;
}

/**
 * Get pip value for a pair
 */
function getPipValue(pair: string): number {
  // JPY pairs have different pip values
  if (pair.includes("JPY")) {
    return 0.01;
  }
  return 0.0001;
}

/**
 * Format price for display
 */
export function formatPrice(price: number, pair: string): string {
  const decimals = pair.includes("JPY") ? 3 : 5;
  return price.toFixed(decimals);
}

/**
 * Calculate pip difference between two prices
 */
export function calculatePips(
  price1: number,
  price2: number,
  pair: string
): number {
  const pipValue = getPipValue(pair);
  return Math.round((price2 - price1) / pipValue);
}
