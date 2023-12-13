import { getPairIds } from "../../pair/helpers/getPairIds";
import { usePairsQueries } from "../../queries/hooks/usePairsQueries";

export const usePairs = (pairIds: string[] = getPairIds()) => {
  const pairsQueries = usePairsQueries(pairIds);

  return pairsQueries.map((pairQuery) => pairQuery.data);
};
