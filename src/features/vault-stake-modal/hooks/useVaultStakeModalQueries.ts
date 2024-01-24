import { useVaultTokenQuery } from "../../queries/hooks/useVaultTokenQuery";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";

export const useVaultStakeModalQueries = (vaultId: string) => {
  const {
    chainId,
    addresses: { vault, rewardTracker = "" },
  } = getVaultConfig(vaultId);

  const vaultTokenQuery = useVaultTokenQuery({
    chainId,
    tokenAddress: vault,
    spenderAddress: rewardTracker,
  });

  return {
    vaultTokenQuery,
  };
};
