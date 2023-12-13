import { useVaultTokenQuery } from "../../queries/hooks/useVaultTokenQuery";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";

export const useVaultToken = (vaultId: string) => {
  const {
    chainId,
    addresses: { vault },
  } = getVaultConfig(vaultId);

  const vaultTokenQuery = useVaultTokenQuery({
    chainId,
    tokenAddress: vault,
    spenderAddress: vault,
  });

  return vaultTokenQuery.data;
};
