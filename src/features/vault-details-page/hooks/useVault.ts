import { useVaultQuery } from "../../queries/hooks/useVaultQuery";

export const useVault = (vaultId: string) => {
  const vaultQuery = useVaultQuery(vaultId);

  return vaultQuery.data;
};
