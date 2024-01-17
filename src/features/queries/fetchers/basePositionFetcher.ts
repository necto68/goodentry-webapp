import { fromTokenAmount } from "../../input-card/helpers/tokenAmount";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { queryClient } from "../../shared/constants/queryClient";
import { getExp, getZero, toBig } from "../../shared/helpers/bigjs";
import { IGoodEntryPositionManager__factory as PositionManagerFactory } from "../../smart-contracts/types";
import { exerciseFee } from "../../trade-panel/constants/openPosition";
import { isPositionSideLong } from "../../trade-panel/helpers/isPositionSideLong";
import { PositionSide } from "../../trade-panel/types/PositionSide";
import { getProvider } from "../../web3/helpers/getProvider";
import { getTokenQueryOptions } from "../query-options-getters/getTokenQueryOptions";

import type { Position } from "../types/Position";

export const basePositionFetcher = async (
  pairId: string,
  basePositionPrice: number,
  positionId: number
): Promise<Position> => {
  const {
    chainId,
    addresses: {
      baseToken: baseTokenAddress,
      quoteToken: quoteTokenAddress,
      positionManager,
    },
  } = getPairConfig(pairId);

  const provider = getProvider(chainId);

  const positionManagerContract = PositionManagerFactory.connect(
    positionManager,
    provider
  );

  const [baseToken, quoteToken, position, fees] = await Promise.all([
    queryClient.ensureQueryData(
      getTokenQueryOptions(chainId, baseTokenAddress)
    ),
    queryClient.ensureQueryData(
      getTokenQueryOptions(chainId, quoteTokenAddress)
    ),
    positionManagerContract.getPosition(positionId),
    positionManagerContract.getFeesAccumulatedAndMin(positionId),
  ]);

  const [feesAccumulated, feesMin] = [fees.feesAccumulated, fees.feesMin].map(
    (fee) => fromTokenAmount(toBig(fee), quoteToken)
  );

  const priceDivisor = getExp(8);

  const id = positionId;
  const positionSide = position.isCall ? PositionSide.LONG : PositionSide.SHORT;
  const isLong = isPositionSideLong(positionSide);

  const entryPrice = toBig(position.strike).div(priceDivisor).toNumber();

  const collateralAmount = fromTokenAmount(
    toBig(position.collateralAmount),
    quoteToken
  );

  const initialCollateral = collateralAmount.sub(exerciseFee);
  const currentCollateral = initialCollateral.sub(feesAccumulated);

  const notionalAmount = fromTokenAmount(
    toBig(position.notionalAmount),
    isLong ? baseToken : quoteToken
  );

  const positionSize = isLong ? notionalAmount.mul(entryPrice) : notionalAmount;
  const leverage = positionSize.div(initialCollateral).round().toNumber();

  let profitAndLossValue = getZero();

  if (isLong && basePositionPrice > entryPrice) {
    profitAndLossValue = profitAndLossValue.add(
      notionalAmount.mul(basePositionPrice - entryPrice)
    );
  } else if (!isLong && basePositionPrice < entryPrice) {
    profitAndLossValue = profitAndLossValue.add(
      notionalAmount.div(entryPrice).mul(entryPrice - basePositionPrice)
    );
  } else {
    profitAndLossValue = getZero();
  }

  profitAndLossValue = profitAndLossValue.sub(feesAccumulated);

  // divide by 10e10 because of scaling
  // then divide by quoteToken.decimals
  const fundingRate = toBig(position.data)
    .div(getExp(10))
    .div(getExp(quoteToken.decimals));

  const optionHourlyBorrowRate = fundingRate
    .mul(3600)
    .div(positionSize)
    .toNumber();
  const runwayInSeconds = currentCollateral.div(fundingRate).toNumber();

  return {
    id,
    pairId,
    positionSide,
    entryPrice,
    initialCollateral,
    leverage,
    positionSize,
    optionHourlyBorrowRate,
    runwayInSeconds,
    profitAndLossValue,
    feesAccumulated,
    feesMin,
  };
};
