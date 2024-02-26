import { useAssetPricesQuery } from "../../queries/hooks/useAssetPricesQuery";

export const useAssetPrices = (pairId: string) => {
  const assetPricesQuery = useAssetPricesQuery(pairId);

  return assetPricesQuery.data;
};
