import { useQuery } from "@tanstack/react-query";

import { useWallet } from "../../wallet/hooks/useWallet";
import { getVaultTokenQueryOptions } from "../query-options-getters/getVaultTokenQueryOptions";

import type { TokenQueryParameters } from "../types/TokenQueryParameters";

export const useVaultTokenQuery = ({
  chainId,
  tokenAddress,
  spenderAddress,
}: TokenQueryParameters) => {
  const { account } = useWallet();

  const queryOptions = getVaultTokenQueryOptions(
    chainId,
    tokenAddress,
    spenderAddress,
    account
  );

  return useQuery(queryOptions);
};
