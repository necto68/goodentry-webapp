import { usePairQuery } from "../../queries/hooks/usePairQuery";
import { useSelectedPairIdStore } from "../stores/useSelectedPairIdStore";

export const usePair = (pairId?: string) => {
  const { selectedPairId } = useSelectedPairIdStore();
  const pairQuery = usePairQuery(pairId ?? selectedPairId);

  return pairQuery.data;
};
