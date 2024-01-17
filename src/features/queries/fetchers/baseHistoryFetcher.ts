import { fromTokenAmount } from "../../input-card/helpers/tokenAmount";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { queryClient } from "../../shared/constants/queryClient";
import { toBig } from "../../shared/helpers/bigjs";
import { PositionSide } from "../../trade-panel/types/PositionSide";
import { getTokenQueryOptions } from "../query-options-getters/getTokenQueryOptions";
import { TransactionType } from "../types/PositionsResponse";

import type { PositionHistory } from "../types/PositionHistory";
import type { PositionResponseTransaction } from "../types/PositionsResponse";
import type { Token } from "../types/Token";

// eslint-disable-next-line complexity
export const baseHistoryFetcher = async (
  pairId: string,
  historyDto: PositionResponseTransaction
  // eslint-disable-next-line sonarjs/cognitive-complexity
): Promise<PositionHistory> => {
  const { chainId } = getPairConfig(pairId);

  const {
    pnl,
    strike,
    hash,
    date,
    entry,
    type,
    token0: token0Address,
    token1: token1Address,
    underlying,
  } = historyDto;
  const { amount0, amount1 } = underlying;

  const [token0, token1] = await Promise.all([
    queryClient.fetchQuery(getTokenQueryOptions(chainId, token0Address)),
    queryClient.fetchQuery(getTokenQueryOptions(chainId, token1Address)),
  ]);

  const side = toBig(amount0).gt(toBig(amount1))
    ? PositionSide.LONG
    : PositionSide.SHORT;
  const token = side === PositionSide.LONG ? token0 : token1;

  let stableCoin = token0;
  let altCoin = token1;

  if (token1.symbol.includes("USD")) {
    stableCoin = token1;
    altCoin = token0;
  }

  let amount = "0";

  if (type === TransactionType.OPEN_POSITION) {
    amount =
      side === PositionSide.LONG
        ? toBig(amount0)
            .mul(entry ?? 1)
            .toString()
        : amount1;
  }

  if (type === TransactionType.CLOSE_POSITION) {
    amount =
      side === PositionSide.LONG
        ? toBig(amount0)
            .mul(entry ?? 1)
            .toString()
        : amount1;
  }

  return {
    hash,
    pairId,
    chainId,
    entry,
    strike,
    type: type as TransactionType,
    date: new Date(date),

    pnl: fromTokenAmount(
      toBig(pnl).mul(type === TransactionType.LIQUIDATE_POSITION ? -1 : 1),
      { decimals: 8 } as Token
    ).toNumber(),

    amount: fromTokenAmount(toBig(amount), token),
    symbol: stableCoin.symbol,
    tickerSymbol: altCoin.symbol,
    side: side === PositionSide.LONG ? "Long" : "Short",
  };
};
