import { aTokenFetcher } from "../fetchers/aTokenFetcher";
import { QueryType } from "../types/QueryType";

import type { ChainId } from "../../web3/types/ChainId";

export const getATokenQueryOptions = (
  chainId: ChainId,
  tokenAddress: string | null,
  spenderAddress?: string,
  account?: string
) => ({
  queryKey: [QueryType.A_TOKEN, chainId, tokenAddress, spenderAddress, account],

  queryFn: async () =>
    await aTokenFetcher(chainId, tokenAddress ?? "", spenderAddress, account),

  enabled: Boolean(tokenAddress),
});
