export const FOREX_PAIRS = {
  Majors: [
    "EUR/USD",
    "GBP/USD",
    "USD/JPY",
    "USD/CHF",
    "AUD/USD",
    "USD/CAD",
    "NZD/USD",
  ],
  Minors: [
    "EUR/GBP",
    "EUR/JPY",
    "GBP/JPY",
    "AUD/JPY",
    "EUR/AUD",
    "GBP/CAD",
    "EUR/CAD",
    "CHF/JPY",
  ],
  Exotics: [
    "USD/ZAR",
    "USD/NGN",
    "USD/MXN",
    "USD/TRY",
    "USD/SGD",
    "EUR/TRY",
    "GBP/ZAR",
  ],
} as const;

export type ForexPairGroup = keyof typeof FOREX_PAIRS;

export type ForexPair =
  (typeof FOREX_PAIRS)[ForexPairGroup][number];

export function getAllPairs(): string[] {
  return [
    ...FOREX_PAIRS.Majors,
    ...FOREX_PAIRS.Minors,
    ...FOREX_PAIRS.Exotics,
  ];
}

export function isValidPair(pair: string): boolean {
  return getAllPairs().includes(pair);
}
