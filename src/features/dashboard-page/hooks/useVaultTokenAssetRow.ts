import { AssetRowType } from "../types/PairAssetsRow";

import type { TokenData } from "../../queries/types/Token";
import type { Vault } from "../../queries/types/Vault";
import type { VaultTokenAssetRow } from "../types/PairAssetsRow";

export const useVaultTokenAssetRow = (
  vaultId: string | undefined,
  vault: Vault | undefined,
  vaultToken: TokenData,
  collateralTokens: [TokenData, TokenData]
): VaultTokenAssetRow | undefined => {
  if (
    !vaultId ||
    !vault ||
    !vaultToken ||
    !collateralTokens[0] ||
    !collateralTokens[1]
  ) {
    return undefined;
  }

  const { totalAnnualPercentageYield } = vault;

  return {
    type: AssetRowType.VAULT_TOKEN,
    vaultId,
    token: vaultToken,
    collateralTokens: [collateralTokens[0], collateralTokens[1]],
    annualPercentageRate: totalAnnualPercentageYield,
  };
};
