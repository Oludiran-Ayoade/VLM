import posthog from 'posthog-js';

export function initAnalytics() {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug();
      },
    });
  }
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    posthog.capture(eventName, properties);
  }
}

export function trackAnalysisStarted(pair: string) {
  trackEvent('analysis_started', { pair });
}

export function trackAnalysisCompleted(pair: string, probability: number, direction: string) {
  trackEvent('analysis_completed', { pair, probability, direction });
}

export function trackAnalysisFailed(pair: string, error: string) {
  trackEvent('analysis_failed', { pair, error });
}

export function trackImageUploaded(timeframe: string) {
  trackEvent('image_uploaded', { timeframe });
}

export function trackTradeSetupViewed(pair: string, riskReward: string) {
  trackEvent('trade_setup_viewed', { pair, riskReward });
}
