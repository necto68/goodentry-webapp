import { assetPricesFetcher } from "../fetchers/assetPricesFetcher";
import { QueryType } from "../types/QueryType";

export const getAssetPricesQueryOptions = (pairId: string) => ({
  queryKey: [QueryType.ASSET_PRICES, pairId],
  queryFn: async () => await assetPricesFetcher(pairId),
  staleTime: Number.POSITIVE_INFINITY,
});
