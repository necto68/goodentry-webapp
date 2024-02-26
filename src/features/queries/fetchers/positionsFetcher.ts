import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { getPairIds } from "../../pair/helpers/getPairIds";
import { queryClient } from "../../shared/constants/queryClient";
import { toBig } from "../../shared/helpers/bigjs";
import { IGoodEntryPositionManager__factory as PositionManagerFactory } from "../../smart-contracts/types";
import { getProvider } from "../../web3/helpers/getProvider";
import { getPairPricesQueryOptions } from "../query-options-getters/getPairPricesQueryOptions";

import { basePositionFetcher } from "./basePositionFetcher";

import type { Position } from "../types/Position";

export const positionsFetcher = async (
  account?: string
): Promise<Position[] | null> => {
  if (!account) {
    return null;
  }

  const pairIds = getPairIds();

  const pairPositionsConfigs = await Promise.all(
    pairIds.map(async (pairId) => {
      const {
        chainId,
        addresses: { positionManager },
      } = getPairConfig(pairId);

      const provider = getProvider(chainId);

      const positionManagerContract = PositionManagerFactory.connect(
        positionManager,
        provider
      );

      const [{ baseTokenPrice }, rawPositionsLength] = await Promise.all([
        queryClient.fetchQuery(getPairPricesQueryOptions(pairId)),
        positionManagerContract.balanceOf(account),
      ]);
      const positionsLength = toBig(rawPositionsLength).toNumber();

      const positionsIds = await Promise.all(
        Array.from({ length: positionsLength }, async (item, index) => {
          const rawPositionId =
            await positionManagerContract.tokenOfOwnerByIndex(account, index);

          return toBig(rawPositionId).toNumber();
        })
      );

      return {
        pairId,
        baseTokenPrice,
        positionsIds,
      };
    })
  );

  const positionConfigs = pairPositionsConfigs.flatMap(
    ({ pairId, baseTokenPrice, positionsIds }) =>
      positionsIds.map((positionId) => ({
        pairId,
        baseTokenPrice,
        positionId,
      }))
  );

  return await Promise.all(
    positionConfigs.map(
      async ({ pairId, baseTokenPrice, positionId }) =>
        await basePositionFetcher(pairId, baseTokenPrice, positionId)
    )
  );
};
