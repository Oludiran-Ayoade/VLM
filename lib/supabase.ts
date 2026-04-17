import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AnalysisRecord {
  id?: string;
  user_id?: string;
  pair: string;
  direction: string;
  probability: number;
  confidence_level: string;
  entry_price: string;
  stop_loss: string;
  take_profit_1: string;
  risk_reward_ratio: string;
  created_at?: string;
  actual_outcome?: 'win' | 'loss' | 'breakeven' | 'pending';
  pips_gained?: number;
  notes?: string;
}

export async function saveAnalysis(analysis: AnalysisRecord) {
  const { data, error } = await supabase
    .from('analyses')
    .insert([analysis])
    .select();

  if (error) {
    console.error('Error saving analysis:', error);
    throw error;
  }

  return data[0];
}

export async function getAnalysisHistory(userId?: string, limit = 50) {
  let query = supabase
    .from('analyses')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching analysis history:', error);
    throw error;
  }

  return data;
}

export async function updateAnalysisOutcome(
  id: string,
  outcome: 'win' | 'loss' | 'breakeven',
  pipsGained: number,
  notes?: string
) {
  const { data, error } = await supabase
    .from('analyses')
    .update({
      actual_outcome: outcome,
      pips_gained: pipsGained,
      notes,
    })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating analysis outcome:', error);
    throw error;
  }

  return data[0];
}

export async function getPerformanceStats(userId?: string) {
  let query = supabase.from('analyses').select('*');

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching performance stats:', error);
    throw error;
  }

  const completed = data?.filter((a) => a.actual_outcome !== 'pending') || [];
  const wins = completed.filter((a) => a.actual_outcome === 'win').length;
  const losses = completed.filter((a) => a.actual_outcome === 'loss').length;
  const totalPips = completed.reduce((sum, a) => sum + (a.pips_gained || 0), 0);

  return {
    totalAnalyses: data?.length || 0,
    completedTrades: completed.length,
    winRate: completed.length > 0 ? (wins / completed.length) * 100 : 0,
    totalPips,
    averagePipsPerTrade: completed.length > 0 ? totalPips / completed.length : 0,
    wins,
    losses,
  };
}
