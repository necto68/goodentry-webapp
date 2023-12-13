import { assetPricesFetcher } from "../fetchers/assetPricesFetcher";
import { QueryType } from "../types/QueryType";

export const getAssetPricesQueryOptions = (pairId: string) => ({
  queryKey: [QueryType.ASSET_PRICES, pairId],
  queryFn: async () => await assetPricesFetcher(pairId),
  staleTime: 5000,
  refetchInterval: 5000,
});
