import { vaultApiDataFetcher } from "../fetchers/vaultApiDataFetcher";
import { QueryType } from "../types/QueryType";

export const getVaultApiDataQueryOptions = (vaultAddress: string) => ({
  queryKey: [QueryType.VAULT_API_DATA, vaultAddress],
  queryFn: async () => await vaultApiDataFetcher(vaultAddress),
  staleTime: Number.POSITIVE_INFINITY,
});
