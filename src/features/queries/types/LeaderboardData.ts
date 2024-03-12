export interface LeaderboardRow {
  id: string;
  rank: number;
  account: string;
  week: number;
  weeklyTradesAmount: number;
  weeklyTotalVolume: number;
  weeklyProfitAndLoss: number;
  weeklyProfitAndLossPercentage: number;
}

export type LeaderboardData = LeaderboardRow[] | null;
