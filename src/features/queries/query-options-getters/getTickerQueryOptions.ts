import { tickerFetcher } from "../fetchers/tickerFetcher";
import { QueryType } from "../types/QueryType";

export const getTickerQueryOptions = (
  pairId: string,
  tickerAddress: string | null,
  account?: string
) => ({
  queryKey: [QueryType.TICKER, pairId, tickerAddress, account],

  queryFn: async () =>
    await tickerFetcher(pairId, tickerAddress ?? "", account),

  staleTime: Number.POSITIVE_INFINITY,
  enabled: Boolean(tickerAddress),
});
