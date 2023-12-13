import { useQuery } from "@tanstack/react-query";

import { useWallet } from "../../wallet/hooks/useWallet";
import { getPositionsQueryOptions } from "../query-options-getters/getPositionsQueryOptions";

export const usePositionsQuery = () => {
  const { account } = useWallet();
  const queryOptions = getPositionsQueryOptions(account);

  return useQuery(queryOptions);
};
