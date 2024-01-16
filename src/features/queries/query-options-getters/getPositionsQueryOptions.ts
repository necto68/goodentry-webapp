import { positionsFetcher } from "../fetchers/positionsFetcher";
import { QueryType } from "../types/QueryType";

export const getPositionsQueryOptions = (account?: string) => ({
  queryKey: [QueryType.POSITIONS, account],
  queryFn: async () => await positionsFetcher(account),
  staleTime: 10_000,
  refetchInterval: 10_000,
});
