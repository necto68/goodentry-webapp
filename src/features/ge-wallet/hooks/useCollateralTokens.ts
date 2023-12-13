import { useLendingPoolModalQueries } from "../../lending-pool-modal/hooks/useLendingPoolModalQueries";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { usePositions } from "../../protected-perps-page/hooks/usePositions";
import { getZero } from "../../shared/helpers/bigjs";

import type { CollateralTokens } from "../types/CollateralTokens";

export const useCollateralTokens = (pairId: string): CollateralTokens => {
  const {
    addresses: { lendingPool },
  } = getPairConfig(pairId);

  const { aToken0Query, aToken1Query } = useLendingPoolModalQueries(
    pairId,
    lendingPool
  );

  const positions = usePositions();

  const aToken0Data = aToken0Query.data;
  const aToken1Data = aToken1Query.data;

  if (
    positions === undefined ||
    aToken0Data === undefined ||
    aToken1Data === undefined
  ) {
    return {
      collateralToken0: undefined,
      collateralToken1: undefined,
    };
  }

  if (
    positions === null ||
    aToken0Data.balance === null ||
    aToken1Data.balance === null
  ) {
    const collateralToken0 = {
      ...aToken0Data,
      balance: null,
    };

    const collateralToken1 = {
      ...aToken1Data,
      balance: null,
    };

    return {
      collateralToken0,
      collateralToken1,
    };
  }

  const selectedPairPositions = positions.filter(
    (position) => position.pairId === pairId
  );

  const totalAmount0 = selectedPairPositions.reduce(
    (accumulator, current) => accumulator.add(current.token0Amount),
    getZero()
  );

  const totalAmount1 = selectedPairPositions.reduce(
    (accumulator, current) => accumulator.add(current.token1Amount),
    getZero()
  );

  const collateralToken0 = {
    ...aToken0Data,
    balance: aToken0Data.balance.sub(totalAmount0),
  };

  const collateralToken1 = {
    ...aToken1Data,
    balance: aToken1Data.balance.sub(totalAmount1),
  };

  return {
    collateralToken0,
    collateralToken1,
  };
};
