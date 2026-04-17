import { describe, it, expect, vi } from 'vitest';
import { checkNewsCalendar, isHighVolatilityPeriod } from '@/lib/news-calendar';

describe('News Calendar', () => {
  it('should detect high volatility periods', () => {
    // Mock UTC time to 13:30 (US news time)
    vi.setSystemTime(new Date('2024-01-01T13:30:00Z'));
    expect(isHighVolatilityPeriod()).toBe(true);
    
    // Mock UTC time to 10:00 (no major news)
    vi.setSystemTime(new Date('2024-01-01T10:00:00Z'));
    expect(isHighVolatilityPeriod()).toBe(false);
    
    vi.useRealTimers();
  });

  it('should handle API failures gracefully', async () => {
    const result = await checkNewsCalendar('EUR/USD');
    expect(result).toHaveProperty('hasHighImpactNews');
    expect(result).toHaveProperty('upcomingEvents');
  });
});
