import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { NATIVE_COIN_ADDRESS } from "../../queries/constants/nativeCoin";
import { useTokenQuery } from "../../queries/hooks/useTokenQuery";
import { useVaultQuery } from "../../queries/hooks/useVaultQuery";
import { useVaultTokenQuery } from "../../queries/hooks/useVaultTokenQuery";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { getChainMetadata } from "../../web3/helpers/getChainMetadata";

export const useVaultModalQueries = (vaultId: string) => {
  const {
    chainId,
    pairId,
    addresses: { vault },
  } = getVaultConfig(vaultId);

  const {
    addresses: { baseToken, quoteToken },
  } = getPairConfig(pairId);

  const {
    addresses: { vaultMigrationManager },
  } = getChainMetadata(chainId);

  const vaultQuery = useVaultQuery(vaultId);

  const vaultTokenQuery = useVaultTokenQuery({
    chainId,
    tokenAddress: vault,
    spenderAddress: vault,
  });

  const migrationVaultTokenQuery = useVaultTokenQuery({
    chainId,
    tokenAddress: vault,
    spenderAddress: vaultMigrationManager,
  });

  const nativeCoinQuery = useTokenQuery({
    chainId,
    tokenAddress: NATIVE_COIN_ADDRESS,
  });

  const baseTokenQuery = useTokenQuery({
    chainId,
    tokenAddress: baseToken,
    spenderAddress: vault,
  });

  const quoteTokenQuery = useTokenQuery({
    chainId,
    tokenAddress: quoteToken,
    spenderAddress: vault,
  });

  return {
    vaultQuery,
    vaultTokenQuery,
    migrationVaultTokenQuery,
    nativeCoinQuery,
    baseTokenQuery,
    quoteTokenQuery,
  };
};
