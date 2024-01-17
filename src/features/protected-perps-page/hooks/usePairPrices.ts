import { usePairPricesQuery } from "../../queries/hooks/usePairPricesQuery";

export const usePairPrices = (pairId: string) => {
  const pairPricesQuery = usePairPricesQuery(pairId);

  return pairPricesQuery.data;
};
