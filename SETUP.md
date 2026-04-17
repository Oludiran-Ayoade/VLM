# Forex Visual Analyzer - Complete Setup Guide

## Prerequisites
- Node.js 20+
- npm or yarn
- Git

## 1. Clone & Install

```bash
git clone https://github.com/Oludiran-Ayoade/VLM.git
cd forex-visual-analyzer
npm install
```

## 2. Environment Variables Setup

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### Required Services & API Keys

#### A. Anthropic API (Required)
1. Go to https://console.anthropic.com/
2. Sign up and add $5+ credits
3. Create an API key
4. Add to `.env.local`:
   ```
   ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```

#### B. Supabase Database (Required)
1. Go to https://supabase.com/dashboard
2. Create a new project
3. Go to Project Settings → API
4. Copy the URL and anon key
5. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
6. Run the schema:
   - Go to SQL Editor in Supabase
   - Copy contents of `supabase/schema.sql`
   - Execute the SQL

#### C. Sentry Error Monitoring (Recommended)
1. Go to https://sentry.io/
2. Create a new Next.js project
3. Copy the DSN
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
   ```

#### D. PostHog Analytics (Recommended)
1. Go to https://posthog.com/
2. Create a project
3. Copy the API key
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_POSTHOG_KEY=phc_your-key
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```

#### E. Clerk Authentication (Optional)
1. Go to https://clerk.com/
2. Create an application
3. Copy the keys
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-key
   CLERK_SECRET_KEY=sk_test_your-key
   ```

## 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## 4. Run Tests

```bash
# Unit tests
npm run test:unit

# E2E tests
npm run test:e2e

# With UI
npm run test:e2e:ui

# Coverage
npm run test:coverage
```

## 5. Build for Production

```bash
npm run build
npm start
```

## 6. Deploy to Vercel

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Oludiran-Ayoade/VLM)

### Manual Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables in Vercel
Add all environment variables from `.env.local` to Vercel:
1. Go to Project Settings → Environment Variables
2. Add each variable
3. Redeploy

## 7. CI/CD with GitHub Actions

The project includes a CI/CD pipeline (`.github/workflows/ci.yml`).

### Setup GitHub Secrets
Go to Repository Settings → Secrets and add:
- `ANTHROPIC_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SENTRY_DSN`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## 8. Features Enabled

✅ **News Calendar Integration** - Blocks trading during high-impact news
✅ **Database Persistence** - Saves all analyses to Supabase
✅ **Error Monitoring** - Sentry tracks all errors
✅ **Analytics** - PostHog tracks user behavior
✅ **Automated Testing** - Vitest + Playwright
✅ **CI/CD Pipeline** - GitHub Actions
✅ **Performance Tracking** - Win rate, pips, R:R tracking

## 9. Usage

1. Select currency pair (22 pairs available)
2. Upload 3 chart screenshots (1D, 1H, 5M)
3. Click "Analyze Charts"
4. Get:
   - Probability gauge (0-100%)
   - Exact Entry, SL, TP levels
   - Decision rationale
   - Risk assessment

## 10. Monitoring & Analytics

### Sentry Dashboard
- View errors at https://sentry.io/
- Set up alerts for critical errors

### PostHog Dashboard
- View analytics at https://posthog.com/
- Track conversion funnels
- Analyze user behavior

### Supabase Dashboard
- View database at https://supabase.com/dashboard
- Monitor API usage
- Check performance stats

## 11. Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| Anthropic API | ~$0.15-0.30/analysis | Pay-per-use |
| Supabase | Free tier (500MB) | Upgrade at $25/mo |
| Sentry | Free tier (5K errors/mo) | Upgrade at $26/mo |
| PostHog | Free tier (1M events/mo) | Upgrade at $0.00045/event |
| Vercel | Free tier | Upgrade at $20/mo |

**Total for testing**: ~$5-10/month

## 12. Troubleshooting

### Build Errors
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection Issues
- Check Supabase URL and key
- Verify schema is applied
- Check RLS policies

### API Timeout
- Increase timeout in `app/api/analyze/route.ts`
- Check Anthropic API status

### News Calendar Not Working
- API may be rate-limited
- Fallback to time-based check works automatically

## 13. Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Run tests: `npm run test:unit && npm run test:e2e`
5. Submit pull request

## Support

- GitHub Issues: https://github.com/Oludiran-Ayoade/VLM/issues
- Documentation: See README.md
