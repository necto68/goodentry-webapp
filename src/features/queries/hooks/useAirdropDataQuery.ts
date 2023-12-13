import { useQuery } from "@tanstack/react-query";

import { useWallet } from "../../wallet/hooks/useWallet";
import { getAirdropDataQueryOptions } from "../query-options-getters/getAirdropDataQueryOptions";

export const useAirdropDataQuery = () => {
  const { account } = useWallet();
  const queryOptions = getAirdropDataQueryOptions(account);

  return useQuery(queryOptions);
};
