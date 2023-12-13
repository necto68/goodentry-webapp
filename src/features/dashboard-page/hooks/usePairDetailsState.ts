import { useCollateralTokens } from "../../ge-wallet/hooks/useCollateralTokens";
import { useAssetPrices } from "../../protected-perps-page/hooks/useAssetPrices";
import { usePair } from "../../protected-perps-page/hooks/usePair";
import { vaultConfigs } from "../../vault/constants/vaultConfigs";
import { useVaultToken } from "../../vault-details-page/hooks/useVaultToken";
import { useVaults } from "../../vaults-page/hooks/useVaults";

import type { TokenData } from "../../queries/types/Token";

export const usePairDetailsState = (pairId: string) => {
  const pair = usePair(pairId);
  const assetPrices = useAssetPrices(pairId);

  const { collateralToken0, collateralToken1 } = useCollateralTokens(pairId);

  const collateralTokens: [TokenData, TokenData] = [
    collateralToken0,
    collateralToken1,
  ];

  const vaultIds = vaultConfigs
    .filter((vaultConfig) => vaultConfig.pairId === pairId)
    .map((vaultConfig) => vaultConfig.id);

  const vaults = useVaults(vaultIds);

  // activeVaultToken - vault after migration
  const activeVaultToken = useVaultToken(vaultIds[0]);

  // deprecatedVaultToken - vault before migration
  const deprecatedVaultToken = useVaultToken(vaultIds[1]);

  return {
    pair,
    assetPrices,
    collateralTokens,
    vaults,
    vaultTokens: [activeVaultToken, deprecatedVaultToken],
  };
};
