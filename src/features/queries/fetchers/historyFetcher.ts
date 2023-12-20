import { baseHistoryFetcher } from "./baseHistoryFetcher";

import type { PositionHistory } from "../types/PositionHistory";
import type { AccountData } from "../types/PositionsResponse";

export const historyFetcher = async (
  account?: string
): Promise<PositionHistory[] | null> => {
  if (!account) {
    return null;
  }

  const positionsURL = `https://roe.nicodeva.xyz/stats/arbitrum/tx/${account}.json`;

  const positionsDataResponse = await fetch(positionsURL, {
    cache: "no-store",
  }).catch(() => null);

  if (!positionsDataResponse) {
    return [];
  }

  const rawPositionAccountData =
    (await positionsDataResponse.json()) as AccountData;
  const rawHistory = rawPositionAccountData.tx;

  if (rawHistory.length === 0) {
    return [];
  }

  // TODO: v2 update
  const positionsPairIds: string[] = [""];

  return await Promise.all(
    rawHistory
      .map(
        async (historyDto, index) =>
          await baseHistoryFetcher(positionsPairIds[index], historyDto)
      )
      .reverse()
  );
};
