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

export interface LeaderboardWeekData {
  week: number;
  rows: LeaderboardRow[];
}

export type LeaderboardData = LeaderboardWeekData[] | null;
