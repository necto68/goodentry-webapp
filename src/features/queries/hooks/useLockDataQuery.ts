import { useQuery } from "@tanstack/react-query";

import { useWallet } from "../../wallet/hooks/useWallet";
import { getLockDataQueryOptions } from "../query-options-getters/getLockDataQueryOptions";

export const useLockDataQuery = () => {
  const { account } = useWallet();
  const queryOptions = getLockDataQueryOptions(account);

  return useQuery(queryOptions);
};
