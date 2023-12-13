import { fromTokenAmount } from "../../input-card/helpers/tokenAmount";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { queryClient } from "../../shared/constants/queryClient";
import { getExp, getZero, toBig } from "../../shared/helpers/bigjs";
import { getPairQueryOptions } from "../query-options-getters/getPairQueryOptions";
import { getTickerQueryOptions } from "../query-options-getters/getTickerQueryOptions";
import { getTokenQueryOptions } from "../query-options-getters/getTokenQueryOptions";
import { PositionSide } from "../types/Position";

import type { Position } from "../types/Position";
import type { PositionResponseData } from "../types/PositionsResponse";

export const basePositionFetcher = async (
  pairId: string,
  tickerAddress: string,
  positionData: PositionResponseData,
  account: string
): Promise<Position> => {
  const { chainId } = getPairConfig(pairId);

  const {
    amount0: positionAmount0,
    amount1: positionAmount1,
    entryUsd,
    avgEntry,
  } = positionData;

  const [{ token0Address, token1Address }, ticker] = await Promise.all([
    queryClient.ensureQueryData(getPairQueryOptions(pairId)),
    queryClient.fetchQuery(
      getTickerQueryOptions(pairId, tickerAddress, account)
    ),
  ]);

  const [token0, token1] = await Promise.all([
    queryClient.fetchQuery(getTokenQueryOptions(chainId, token0Address)),
    queryClient.fetchQuery(getTokenQueryOptions(chainId, token1Address)),
  ]);

  const token0Amount = fromTokenAmount(toBig(positionAmount0), token0);
  const token1Amount = fromTokenAmount(toBig(positionAmount1), token1);

  const value0 = token0Amount.mul(token0.price);
  const value1 = token1Amount.mul(token1.price);

  const tickerToken0Value = ticker.tokenAmounts.amount0.mul(token0.price);
  const tickerToken1Value = ticker.tokenAmounts.amount1.mul(token1.price);

  const debtTokenBalance = ticker.debtToken.balance ?? getZero();

  const side = value0.gt(value1) ? PositionSide.LONG : PositionSide.SHORT;

  const size = entryUsd ? toBig(entryUsd).div(getExp(8)) : getZero();

  const profitAndLossValue = value0
    .add(value1)
    .sub(
      debtTokenBalance
        .div(ticker.tickerToken.totalSupply)
        .mul(tickerToken0Value.add(tickerToken1Value))
    );

  const entryPrice = avgEntry ? toBig(avgEntry).toNumber() : 0;

  return {
    id: ticker.id,
    pairId,
    ticker,
    side,
    size,
    entryPrice,
    profitAndLossValue,
    token0Amount,
    token1Amount,
  };
};
