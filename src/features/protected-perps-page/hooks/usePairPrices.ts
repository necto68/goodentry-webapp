import { usePairPricesQuery } from "../../queries/hooks/usePairPricesQuery";
import { useSelectedPairIdStore } from "../stores/useSelectedPairIdStore";

export const usePairPrices = (pairId?: string) => {
  const { selectedPairId } = useSelectedPairIdStore();
  const pairPricesQuery = usePairPricesQuery(pairId ?? selectedPairId);

  return pairPricesQuery.data;
};
