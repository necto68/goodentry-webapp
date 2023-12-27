import { fromTokenAmount } from "../../input-card/helpers/tokenAmount";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { queryClient } from "../../shared/constants/queryClient";
import { getExp, getZero, toBig } from "../../shared/helpers/bigjs";
import { getTokenQueryOptions } from "../query-options-getters/getTokenQueryOptions";
import { PositionSide } from "../types/Position";

import type { Position } from "../types/Position";
import type { PositionResponseData } from "../types/PositionsResponse";

export const basePositionFetcher = async (
  pairId: string,
  positionData: PositionResponseData
): Promise<Position> => {
  const { chainId } = getPairConfig(pairId);

  const {
    amount0: positionAmount0,
    amount1: positionAmount1,
    entryUsd,
    avgEntry,
  } = positionData;

  const {
    addresses: { baseToken, quoteToken },
  } = getPairConfig(pairId);

  const [token0, token1] = await Promise.all([
    queryClient.fetchQuery(getTokenQueryOptions(chainId, baseToken)),
    queryClient.fetchQuery(getTokenQueryOptions(chainId, quoteToken)),
  ]);

  const token0Amount = fromTokenAmount(toBig(positionAmount0), token0);
  const token1Amount = fromTokenAmount(toBig(positionAmount1), token1);

  const value0 = toBig(0);
  const value1 = toBig(0);

  // const value0 = token0Amount.mul(token0.price);
  // const value1 = token1Amount.mul(token1.price);

  const side = value0.gt(value1) ? PositionSide.LONG : PositionSide.SHORT;

  const size = entryUsd ? toBig(entryUsd).div(getExp(8)) : getZero();

  // const profitAndLossValue = value0
  //   .add(value1)
  //   .sub(
  //     debtTokenBalance
  //       .div(ticker.tickerToken.totalSupply)
  //       .mul(tickerToken0Value.add(tickerToken1Value))
  //   );

  const entryPrice = avgEntry ? toBig(avgEntry).toNumber() : 0;

  return {
    // TODO: v2 update
    id: "id",
    pairId,
    side,
    size,
    entryPrice,
    profitAndLossValue: getZero(),
    token0Amount,
    token1Amount,
  };
};
