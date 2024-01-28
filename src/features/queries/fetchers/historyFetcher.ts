import { getPositionManagerPairIdMap } from "../../pair/helpers/getPositionManagerPairIdMap";
import { getExp, toBig } from "../../shared/helpers/bigjs";
import { IGoodEntryPositionManager__factory as PositionManagerFactory } from "../../smart-contracts/types";
import { getProvider } from "../../web3/helpers/getProvider";

import { basePositionFetcher } from "./basePositionFetcher";
import { chainExplorerDataFetcher } from "./chainExplorerDataFetcher";

import type { ClosedPositionEventObject } from "../../smart-contracts/types/IGoodEntryPositionManager";
import type { Log } from "../types/ChainExplorerResponse";
import type { PositionHistoryItem } from "../types/PositionHistoryItem";

export const historyFetcher = async (
  account?: string,
  chainId?: number
): Promise<PositionHistoryItem[] | null> => {
  if (!account || !chainId) {
    return null;
  }

  const provider = getProvider(chainId);

  const positionManagerContract = PositionManagerFactory.connect("", provider);

  const positionManagerContractInterface =
    PositionManagerFactory.createInterface();

  // eslint-disable-next-line new-cap
  const filter = positionManagerContract.filters.ClosedPosition(account, null);

  let historicalData: Log[] = [];

  try {
    const { result } = await chainExplorerDataFetcher(
      chainId,
      filter.address,
      filter.topics
    );

    historicalData = result;
  } catch {
    return [];
  }

  const priceDivisor = getExp(8);

  const positionManagerPairIdMap = getPositionManagerPairIdMap(chainId);

  return await Promise.all(
    historicalData
      .filter(({ address }) =>
        Object.prototype.hasOwnProperty.call(positionManagerPairIdMap, address)
      )
      .map(async (log) => {
        const { data, address, transactionHash } = log;

        const decodedHistory = positionManagerContractInterface.decodeEventLog(
          positionManagerContractInterface.getEvent("ClosedPosition"),
          data
        ) as unknown as ClosedPositionEventObject;

        const { tokenId, pnl: rawPnl } = decodedHistory;

        const positionHistory = await basePositionFetcher(
          positionManagerPairIdMap[address],
          0,
          toBig(tokenId).toNumber()
        );

        const { positionSide, pairId, entryPrice, timestamp, positionSize } =
          positionHistory;

        const amount = positionSize.toNumber();
        const pnl = toBig(rawPnl).div(priceDivisor).toNumber();

        return {
          pnl,
          amount,
          pairId,
          chainId,
          timestamp,
          entryPrice,
          positionSide,
          transactionHash,
        };
      })
      .reverse()
  );
};
