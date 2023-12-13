import { useLendingPoolQuery } from "../../queries/hooks/useLendingPoolQuery";

export const useLendingPool = (pairId: string, lendingPoolAddress: string) => {
  const lendingPoolQuery = useLendingPoolQuery({ pairId, lendingPoolAddress });

  return lendingPoolQuery.data;
};
