import { usePublicSaleDataQuery } from "../../queries/hooks/usePublicSaleDataQuery";

export const usePublicSaleData = () => {
  const publicSaleDataQuery = usePublicSaleDataQuery();

  return publicSaleDataQuery.data;
};
