import { lendingPoolFetcher } from "../fetchers/lendingPoolFetcher";
import { QueryType } from "../types/QueryType";

export const getLendingPoolQueryOptions = (
  pairId: string,
  lendingPoolAddress: string,
  account?: string
) => ({
  queryKey: [QueryType.LENDING_POOL, pairId, lendingPoolAddress, account],

  queryFn: async () =>
    await lendingPoolFetcher(pairId, lendingPoolAddress, account),

  staleTime: Number.POSITIVE_INFINITY,
});
