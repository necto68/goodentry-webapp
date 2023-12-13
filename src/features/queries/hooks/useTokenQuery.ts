import { useQuery } from "@tanstack/react-query";

import { useWallet } from "../../wallet/hooks/useWallet";
import { getTokenQueryOptions } from "../query-options-getters/getTokenQueryOptions";

import type { TokenQueryParameters } from "../types/TokenQueryParameters";

export const useTokenQuery = ({
  chainId,
  tokenAddress,
  spenderAddress,
}: TokenQueryParameters) => {
  const { account } = useWallet();

  const queryOptions = getTokenQueryOptions(
    chainId,
    tokenAddress,
    spenderAddress,
    account
  );

  return useQuery(queryOptions);
};
