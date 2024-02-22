import { useQuery } from "@tanstack/react-query";

import { useWallet } from "../../wallet/hooks/useWallet";
import { getReferralsQueryOptions } from "../query-options-getters/getReferralsQueryOptions";

export const useReferralsQuery = () => {
  const { account, chainId } = useWallet();
  const queryOptions = getReferralsQueryOptions(account, chainId);

  return useQuery(queryOptions);
};
