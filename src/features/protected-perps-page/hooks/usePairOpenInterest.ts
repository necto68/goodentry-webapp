import { usePairOpenInterestQuery } from "../../queries/hooks/usePairOpenInterestQuery";

export const usePairOpenInterest = (pairId: string) => {
  const pairOpenInterestQuery = usePairOpenInterestQuery(pairId);

  return pairOpenInterestQuery.data;
};
