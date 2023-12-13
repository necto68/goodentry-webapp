import { AssetRowType } from "../types/PairAssetsRow";

import type { TokenData } from "../../queries/types/Token";
import type { CollateralTokenAssetRow } from "../types/PairAssetsRow";

export const useCollateralTokenAssetRow = (
  pairId: string,
  collateralToken: TokenData
): CollateralTokenAssetRow | undefined => {
  if (!collateralToken) {
    return undefined;
  }

  return {
    type: AssetRowType.COLLATERAL_TOKEN,
    pairId,
    token: collateralToken,
    annualPercentageRate: 0,
  };
};
