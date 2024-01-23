import { useQuery } from "@tanstack/react-query";

import { useWallet } from "../../wallet/hooks/useWallet";
import { getHistoryQueryOptions } from "../query-options-getters/getHistoryQueryOptions";

export const useHistoryQuery = () => {
  const { account, chainId } = useWallet();
  const queryOptions = getHistoryQueryOptions(account, chainId);

  return useQuery(queryOptions);
};
