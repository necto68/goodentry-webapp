import { useAssetPricesQuery } from "../../queries/hooks/useAssetPricesQuery";
import { useSelectedPairIdStore } from "../stores/useSelectedPairIdStore";

export const useAssetPrices = (pairId?: string) => {
  const { selectedPairId } = useSelectedPairIdStore();
  const assetPricesQuery = useAssetPricesQuery(pairId ?? selectedPairId);

  return assetPricesQuery.data;
};
