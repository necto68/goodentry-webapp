import { vaultFetcher } from "../fetchers/vaultFetcher";
import { QueryType } from "../types/QueryType";

export const getVaultQueryOptions = (vaultId: string) => ({
  queryKey: [QueryType.VAULT, vaultId],
  queryFn: async () => await vaultFetcher(vaultId),
  staleTime: Number.POSITIVE_INFINITY,
});
