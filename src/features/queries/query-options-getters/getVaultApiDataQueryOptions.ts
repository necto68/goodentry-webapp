import { vaultApiDataFetcher } from "../fetchers/vaultApiDataFetcher";
import { QueryType } from "../types/QueryType";

export const getVaultApiDataQueryOptions = (vaultId: string) => ({
  queryKey: [QueryType.VAULT_API_DATA, vaultId],
  queryFn: async () => await vaultApiDataFetcher(vaultId),
  staleTime: Number.POSITIVE_INFINITY,
});
