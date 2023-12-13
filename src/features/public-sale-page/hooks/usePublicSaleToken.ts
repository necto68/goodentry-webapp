import { usePublicSaleQueries } from "./usePublicSaleQueries";

export const usePublicSaleToken = () => {
  const { saleTokenQuery } = usePublicSaleQueries();

  return saleTokenQuery.data;
};
