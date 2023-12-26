import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { NATIVE_COIN_ADDRESS } from "../../queries/constants/nativeCoin";
import { useTokenQuery } from "../../queries/hooks/useTokenQuery";
import { useVaultQuery } from "../../queries/hooks/useVaultQuery";
import { useVaultTokenQuery } from "../../queries/hooks/useVaultTokenQuery";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { getChainMetadata } from "../../web3/helpers/getChainMetadata";

export const useVaultModalQueries = (vaultId: string, vaultAddress: string) => {
  const { chainId, pairId } = getVaultConfig(vaultId);

  const {
    addresses: { baseToken, quoteToken },
  } = getPairConfig(pairId);

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
    tokenAddress: baseToken,
    spenderAddress: vaultAddress,
  });

  const token1Query = useTokenQuery({
    chainId,
    tokenAddress: quoteToken,
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
