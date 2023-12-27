import { useOptionBorrowRatesQuery } from "../../queries/hooks/useOptionBorrowRatesQuery";
import { useSelectedPairIdStore } from "../stores/useSelectedPairIdStore";

export const useOptionBorrowRates = (pairId?: string) => {
  const { selectedPairId } = useSelectedPairIdStore();
  const optionBorrowRates = useOptionBorrowRatesQuery(pairId ?? selectedPairId);

  return optionBorrowRates.data;
};
