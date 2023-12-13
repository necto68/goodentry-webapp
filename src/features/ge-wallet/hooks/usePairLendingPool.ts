import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { useSelectedPairIdStore } from "../../protected-perps-page/stores/useSelectedPairIdStore";

import { useLendingPool } from "./useLendingPool";

export const usePairLendingPool = (pairId?: string) => {
  const { selectedPairId } = useSelectedPairIdStore();

  const lendingPoolPairId = pairId ?? selectedPairId;
  const {
    addresses: { lendingPool },
  } = getPairConfig(lendingPoolPairId);

  return useLendingPool(lendingPoolPairId, lendingPool);
};
