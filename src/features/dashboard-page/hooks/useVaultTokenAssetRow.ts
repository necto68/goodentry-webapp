import { useVaultApiData } from "../../vault-details-page/hooks/useVaultApiData";
import { AssetRowType } from "../types/PairAssetsRow";

import type { Vault } from "../../queries/types/Vault";
import type { VaultToken } from "../../queries/types/VaultToken";
import type { VaultTokenAssetRow } from "../types/PairAssetsRow";

export const useVaultTokenAssetRow = (
  vaultId: string | undefined,
  vault: Vault | undefined,
  vaultToken: VaultToken | undefined
): VaultTokenAssetRow | undefined => {
  const { totalAnnualPercentageRate = 0 } =
    useVaultApiData(vaultId ?? "") ?? {};

  if (!vaultId || !vault || !vaultToken) {
    return undefined;
  }

  return {
    type: AssetRowType.VAULT_TOKEN,
    vaultId,
    vaultToken,
    annualPercentageRate: totalAnnualPercentageRate,
  };
};
