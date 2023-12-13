import { historyFetcher } from "../fetchers/historyFetcher";
import { QueryType } from "../types/QueryType";

export const getHistoryQueryOptions = (account?: string) => ({
  queryKey: [QueryType.HISTORY, account],
  queryFn: async () => await historyFetcher(account),
  staleTime: 5000,
});
