import { pairFetcher } from "../fetchers/pairFetcher";
import { QueryType } from "../types/QueryType";

export const getPairQueryOptions = (pairId: string) => ({
  queryKey: [QueryType.PAIR, pairId],
  queryFn: async () => await pairFetcher(pairId),
  staleTime: Number.POSITIVE_INFINITY,
});
