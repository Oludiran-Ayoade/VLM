-- Supabase Database Schema for Forex Visual Analyzer

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Analyses table
CREATE TABLE IF NOT EXISTS analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT,
  pair TEXT NOT NULL,
  direction TEXT NOT NULL,
  probability INTEGER NOT NULL,
  confidence_level TEXT NOT NULL,
  entry_price TEXT NOT NULL,
  stop_loss TEXT NOT NULL,
  take_profit_1 TEXT NOT NULL,
  take_profit_2 TEXT,
  take_profit_3 TEXT,
  risk_reward_ratio TEXT NOT NULL,
  daily_analysis TEXT,
  hourly_analysis TEXT,
  entry_analysis TEXT,
  decision_rationale TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  actual_outcome TEXT CHECK (actual_outcome IN ('win', 'loss', 'breakeven', 'pending')) DEFAULT 'pending',
  pips_gained DECIMAL(10, 2),
  notes TEXT
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_analyses_user_id ON analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_analyses_pair ON analyses(pair);
CREATE INDEX IF NOT EXISTS idx_analyses_created_at ON analyses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analyses_outcome ON analyses(actual_outcome);

-- Enable Row Level Security (RLS)
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view all analyses (for now - adjust based on your auth strategy)
CREATE POLICY "Allow public read access" ON analyses
  FOR SELECT
  USING (true);

-- Policy: Users can insert their own analyses
CREATE POLICY "Allow authenticated insert" ON analyses
  FOR INSERT
  WITH CHECK (true);

-- Policy: Users can update their own analyses
CREATE POLICY "Allow authenticated update" ON analyses
  FOR UPDATE
  USING (true);

-- Create a view for performance statistics
CREATE OR REPLACE VIEW performance_stats AS
SELECT
  user_id,
  COUNT(*) as total_analyses,
  COUNT(*) FILTER (WHERE actual_outcome != 'pending') as completed_trades,
  COUNT(*) FILTER (WHERE actual_outcome = 'win') as wins,
  COUNT(*) FILTER (WHERE actual_outcome = 'loss') as losses,
  ROUND(
    (COUNT(*) FILTER (WHERE actual_outcome = 'win')::DECIMAL / 
     NULLIF(COUNT(*) FILTER (WHERE actual_outcome != 'pending'), 0) * 100),
    2
  ) as win_rate,
  SUM(pips_gained) FILTER (WHERE actual_outcome != 'pending') as total_pips,
  ROUND(
    AVG(pips_gained) FILTER (WHERE actual_outcome != 'pending'),
    2
  ) as avg_pips_per_trade
FROM analyses
GROUP BY user_id;
