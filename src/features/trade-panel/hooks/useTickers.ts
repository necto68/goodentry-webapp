import { useSelectedPairIdStore } from "../../protected-perps-page/stores/useSelectedPairIdStore";
import { useTickersQueries } from "../../queries/hooks/useTickersQueries";

export const useTickers = (pairId?: string) => {
  const { selectedPairId } = useSelectedPairIdStore();
  const tickersQueries = useTickersQueries(pairId ?? selectedPairId);

  return tickersQueries.map((tickerQuery) => tickerQuery.data);
};
