/**
 * News Calendar Integration
 * Fetches high-impact Forex news events to prevent trading during volatile periods
 */

export interface NewsEvent {
  time: string;
  currency: string;
  event: string;
  impact: "High" | "Medium" | "Low";
  forecast?: string;
  previous?: string;
}

export interface NewsCalendarResponse {
  hasHighImpactNews: boolean;
  upcomingEvents: NewsEvent[];
  nextHighImpactEvent?: NewsEvent;
  warningMessage?: string;
}

/**
 * Check if there's high-impact news in the next 2 hours for the given currency pair
 */
export async function checkNewsCalendar(
  pair: string
): Promise<NewsCalendarResponse> {
  try {
    // Extract currencies from pair (e.g., "EUR/USD" -> ["EUR", "USD"])
    const currencies = pair.split("/");

    // Use ForexFactory API alternative (investing.com economic calendar)
    // Note: For production, you'd use a paid API like Trading Economics or Forex Factory RSS
    const response = await fetch(
      `https://nfs.faireconomy.media/ff_calendar_thisweek.json`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      console.warn("News calendar API unavailable, proceeding without check");
      return {
        hasHighImpactNews: false,
        upcomingEvents: [],
        warningMessage: "News calendar temporarily unavailable",
      };
    }

    const events: any[] = await response.json();
    const now = new Date();
    const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);

    // Filter for high-impact events affecting our currencies
    const relevantEvents = events
      .filter((event) => {
        const eventTime = new Date(event.date);
        const isUpcoming =
          eventTime > now && eventTime < twoHoursFromNow;
        const isHighImpact = event.impact === "High";
        const affectsCurrency =
          currencies.includes(event.country) ||
          (event.country === "USD" && currencies.includes("USD"));

        return isUpcoming && isHighImpact && affectsCurrency;
      })
      .map((event) => ({
        time: new Date(event.date).toLocaleTimeString(),
        currency: event.country,
        event: event.title,
        impact: event.impact as "High" | "Medium" | "Low",
        forecast: event.forecast,
        previous: event.previous,
      }));

    const hasHighImpactNews = relevantEvents.length > 0;
    const nextHighImpactEvent = relevantEvents[0];

    return {
      hasHighImpactNews,
      upcomingEvents: relevantEvents,
      nextHighImpactEvent,
      warningMessage: hasHighImpactNews
        ? `⚠️ HIGH IMPACT NEWS DETECTED: ${nextHighImpactEvent.event} at ${nextHighImpactEvent.time}. Trading not recommended.`
        : undefined,
    };
  } catch (error) {
    console.error("Error checking news calendar:", error);
    return {
      hasHighImpactNews: false,
      upcomingEvents: [],
      warningMessage: "Unable to verify news calendar. Trade with caution.",
    };
  }
}

/**
 * Fallback: Check if current time is during major news hours (simplified)
 */
export function isHighVolatilityPeriod(): boolean {
  const now = new Date();
  const hour = now.getUTCHours();
  const minute = now.getUTCMinutes();

  // Major news release times (UTC):
  // 8:30 AM EST = 13:30 UTC (US news)
  // 12:00 PM GMT = 12:00 UTC (UK news)
  // 7:45 AM GMT = 07:45 UTC (EU news)

  const newsWindows = [
    { start: 7, startMin: 30, end: 8, endMin: 15 }, // EU news
    { start: 12, startMin: 0, end: 12, endMin: 45 }, // UK news
    { start: 13, startMin: 15, end: 14, endMin: 0 }, // US news
  ];

  return newsWindows.some((window) => {
    const currentMinutes = hour * 60 + minute;
    const windowStart = window.start * 60 + window.startMin;
    const windowEnd = window.end * 60 + window.endMin;
    return currentMinutes >= windowStart && currentMinutes <= windowEnd;
  });
}
