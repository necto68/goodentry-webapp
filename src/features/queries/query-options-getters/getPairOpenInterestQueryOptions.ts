import { pairOpenInterestFetcher } from "../fetchers/pairOpenInterestFetcher";
import { QueryType } from "../types/QueryType";

export const getPairOpenInterestQueryOptions = (pairId: string) => ({
  queryKey: [QueryType.PAIR_OPEN_INTEREST, pairId],
  queryFn: async () => await pairOpenInterestFetcher(pairId),
});
