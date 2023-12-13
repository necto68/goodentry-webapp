import { publicSaleDataFetcher } from "../fetchers/publicSaleDataFetcher";
import { QueryType } from "../types/QueryType";

export const getPublicSaleDataQueryOptions = (account?: string) => ({
  queryKey: [QueryType.PUBLIC_SALE_DATA, account],
  queryFn: async () => await publicSaleDataFetcher(account),
  refetchInterval: 5000,
});
