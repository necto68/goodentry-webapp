import { useVaultApiDataQuery } from "../../queries/hooks/useVaultApiDataQuery";

export const useVaultApiData = (vaultId: string) => {
  const vaultApiDataQuery = useVaultApiDataQuery(vaultId);

  return vaultApiDataQuery.data;
};
