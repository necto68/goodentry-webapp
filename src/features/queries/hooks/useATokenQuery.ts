import { useQuery } from "@tanstack/react-query";

import { useWallet } from "../../wallet/hooks/useWallet";
import { getATokenQueryOptions } from "../query-options-getters/getATokenQueryOptions";

import type { TokenQueryParameters } from "../types/TokenQueryParameters";

export const useATokenQuery = ({
  chainId,
  tokenAddress,
  spenderAddress,
}: TokenQueryParameters) => {
  const { account } = useWallet();

  const queryOptions = getATokenQueryOptions(
    chainId,
    tokenAddress,
    spenderAddress,
    account
  );

  return useQuery(queryOptions);
};
