import { lockDataFetcher } from "../fetchers/lockDataFetcher";
import { QueryType } from "../types/QueryType";

export const getLockDataQueryOptions = (account?: string) => ({
  queryKey: [QueryType.LOCK_DATA, account],
  queryFn: async () => await lockDataFetcher(account),
});
