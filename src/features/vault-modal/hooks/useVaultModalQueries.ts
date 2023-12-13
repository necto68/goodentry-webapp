import { usePair } from "../../protected-perps-page/hooks/usePair";
import { NATIVE_COIN_ADDRESS } from "../../queries/constants/nativeCoin";
import { useTokenQuery } from "../../queries/hooks/useTokenQuery";
import { useVaultQuery } from "../../queries/hooks/useVaultQuery";
import { useVaultTokenQuery } from "../../queries/hooks/useVaultTokenQuery";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { getChainMetadata } from "../../web3/helpers/getChainMetadata";

export const useVaultModalQueries = (vaultId: string, vaultAddress: string) => {
  const { chainId, pairId } = getVaultConfig(vaultId);

  const pair = usePair(pairId);

  const { token0Address = "", token1Address = "" } = pair ?? {};

  const {
    addresses: { vaultMigrationManager },
  } = getChainMetadata(chainId);

  const vaultQuery = useVaultQuery(vaultId);

  const vaultTokenQuery = useVaultTokenQuery({
    chainId,
    tokenAddress: vaultAddress,
    spenderAddress: vaultAddress,
  });

  const migrationVaultTokenQuery = useVaultTokenQuery({
    chainId,
    tokenAddress: vaultAddress,
    spenderAddress: vaultMigrationManager,
  });

  const nativeCoinQuery = useTokenQuery({
    chainId,
    tokenAddress: NATIVE_COIN_ADDRESS,
  });

  const token0Query = useTokenQuery({
    chainId,
    tokenAddress: token0Address,
    spenderAddress: vaultAddress,
  });

  const token1Query = useTokenQuery({
    chainId,
    tokenAddress: token1Address,
    spenderAddress: vaultAddress,
  });

  return {
    vaultQuery,
    vaultTokenQuery,
    migrationVaultTokenQuery,
    nativeCoinQuery,
    token0Query,
    token1Query,
  };
};
