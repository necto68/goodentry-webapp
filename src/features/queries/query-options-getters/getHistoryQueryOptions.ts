import { historyFetcher } from "../fetchers/historyFetcher";
import { QueryType } from "../types/QueryType";

export const getHistoryQueryOptions = (account?: string, chainId?: number) => ({
  queryKey: [QueryType.HISTORY, account, chainId],
  queryFn: async () => await historyFetcher(account, chainId),
  staleTime: 5000,
});
