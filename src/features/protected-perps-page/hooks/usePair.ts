import { usePairQuery } from "../../queries/hooks/usePairQuery";

export const usePair = (pairId: string) => {
  const pairQuery = usePairQuery(pairId);

  return pairQuery.data;
};
