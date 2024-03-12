import {
  duneApiKeyHeaderKey,
  duneApiKeyHeaderValue,
  duneQueryId,
} from "../constants/leaderboard";

import type { LeaderboardData } from "../types/LeaderboardData";
import type { LeaderboardDataResponse } from "../types/LeaderboardDataResponse";

export const leaderboardDataFetcher = async (): Promise<LeaderboardData> => {
  const duneApiURL = `https://api.dune.com/api/v1/query/${duneQueryId}/results`;

  const duneDataResponse = await fetch(duneApiURL, {
    headers: { [duneApiKeyHeaderKey]: duneApiKeyHeaderValue },
    cache: "no-store",
  }).catch(() => null);

  if (!duneDataResponse) {
    return null;
  }

  const rawDuneData =
    (await duneDataResponse.json()) as LeaderboardDataResponse;

  const {
    result: { rows: rawRows },
  } = rawDuneData;

  rawRows.sort((a, b) => b.total_pnl - a.total_pnl);

  return rawRows.map((row, index) => {
    const {
      user: account,
      total_pnl: weeklyProfitAndLoss,
      total_trades_completed: weeklyTradesAmount,
      total_volume_weekly: weeklyTotalVolume,
      week_no: week,
    } = row;

    const weeklyProfitAndLossPercentage =
      weeklyProfitAndLoss / weeklyTotalVolume;

    return {
      id: account,
      rank: index + 1,
      account,
      week,
      weeklyTradesAmount,
      weeklyTotalVolume,
      weeklyProfitAndLoss,
      weeklyProfitAndLossPercentage,
    };
  });
};
