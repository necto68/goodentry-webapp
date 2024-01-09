import { usePairOpenInterestQuery } from "../../queries/hooks/usePairOpenInterestQuery";
import { useSelectedPairIdStore } from "../stores/useSelectedPairIdStore";

export const usePairOpenInterest = (pairId?: string) => {
  const { selectedPairId } = useSelectedPairIdStore();
  const pairOpenInterestQuery = usePairOpenInterestQuery(
    pairId ?? selectedPairId
  );

  return pairOpenInterestQuery.data;
};
