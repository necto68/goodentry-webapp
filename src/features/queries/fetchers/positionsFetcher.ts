import { pairConfigs } from "../../pair/constants/pairConfigs";
import { areAddressesEqual } from "../../web3/helpers/addresses";

import { basePositionFetcher } from "./basePositionFetcher";

import type { Position } from "../types/Position";
import type { AccountData } from "../types/PositionsResponse";

export const positionsFetcher = async (
  account?: string
): Promise<Position[] | null> => {
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
  const rawPositions = rawPositionAccountData.status;

  const positionsData = Object.keys(rawPositions)
    .map((tickerAddress) => ({
      tickerAddress,
      positionData: rawPositions[tickerAddress],
    }))
    .filter(({ positionData }) => Number.parseFloat(positionData.debt) !== 0);

  if (positionsData.length === 0) {
    return [];
  }

  const positionsPairIds = positionsData.map(({ positionData }) => {
    const lendingPoolAddress = positionData.vault;
    const pairConfig = pairConfigs.find(({ addresses }) =>
      areAddressesEqual(addresses.lendingPool, lendingPoolAddress)
    );
    return pairConfig?.id ?? pairConfigs[0].id;
  });

  return await Promise.all(
    positionsData.map(
      async ({ positionData }, index) =>
        await basePositionFetcher(positionsPairIds[index], positionData)
    )
  );
};
