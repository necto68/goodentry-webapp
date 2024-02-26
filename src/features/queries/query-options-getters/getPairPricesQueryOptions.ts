import { pairPricesFetcher } from "../fetchers/pairPricesFetcher";
import { QueryType } from "../types/QueryType";

export const getPairPricesQueryOptions = (pairId: string) => ({
  queryKey: [QueryType.PAIR_PRICES, pairId],
  queryFn: async () => await pairPricesFetcher(pairId),
  staleTime: 5000,
  refetchInterval: 5000,
});
