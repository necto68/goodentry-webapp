import { airdropDataFetcher } from "../fetchers/airdropDataFetcher";
import { QueryType } from "../types/QueryType";

export const getAirdropDataQueryOptions = (account?: string) => ({
  queryKey: [QueryType.AIRDROP_DATA, account],
  queryFn: async () => await airdropDataFetcher(account),
});
