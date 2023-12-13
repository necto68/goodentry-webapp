import { useQuery } from "@tanstack/react-query";

import { useWallet } from "../../wallet/hooks/useWallet";
import { getPublicSaleDataQueryOptions } from "../query-options-getters/getPublicSaleDataQueryOptions";

export const usePublicSaleDataQuery = () => {
  const { account } = useWallet();
  const queryOptions = getPublicSaleDataQueryOptions(account);

  return useQuery(queryOptions);
};
