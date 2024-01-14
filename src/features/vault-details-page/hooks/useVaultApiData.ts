import { useVaultApiDataQuery } from "../../queries/hooks/useVaultApiDataQuery";

export const useVaultApiData = (vaultAddress: string) => {
  const vaultApiDataQuery = useVaultApiDataQuery(vaultAddress);

  return vaultApiDataQuery.data;
};
