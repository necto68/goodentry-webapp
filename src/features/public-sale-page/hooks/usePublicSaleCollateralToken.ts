import { usePublicSaleQueries } from "./usePublicSaleQueries";

export const usePublicSaleCollateralToken = () => {
  const { collateralTokenQuery } = usePublicSaleQueries();

  return collateralTokenQuery.data;
};
