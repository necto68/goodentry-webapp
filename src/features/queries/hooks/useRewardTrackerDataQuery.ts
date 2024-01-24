import { useQuery } from "@tanstack/react-query";

import { useWallet } from "../../wallet/hooks/useWallet";
import { getRewardTrackerDataQueryOptions } from "../query-options-getters/getRewardTrackerDataQueryOptions";

export const useRewardTrackerDataQuery = (vaultId: string) => {
  const { account } = useWallet();
  const queryOptions = getRewardTrackerDataQueryOptions(vaultId, account);

  return useQuery(queryOptions);
};
