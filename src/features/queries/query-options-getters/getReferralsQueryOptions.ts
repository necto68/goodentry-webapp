import { referralFetcher } from "../fetchers/referralFetcher";
import { QueryType } from "../types/QueryType";

export const getReferralsQueryOptions = (
  account?: string,
  chainId?: number
) => ({
  queryKey: [QueryType.HISTORY, account, chainId],
  queryFn: async () => await referralFetcher(account, chainId),
  staleTime: 5000,
});
