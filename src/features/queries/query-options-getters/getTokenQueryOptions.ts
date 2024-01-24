import { nativeCoinFetcher } from "../fetchers/nativeCoinFetcher";
import { tokenFetcher } from "../fetchers/tokenFetcher";
import { isNativeCoinAddress } from "../helpers/nativeCoin";
import { QueryType } from "../types/QueryType";

import type { ChainId } from "../../web3/types/ChainId";

export const getTokenQueryOptions = (
  chainId: ChainId,
  tokenAddress: string | undefined,
  spenderAddress?: string,
  account?: string
) => ({
  queryKey: [QueryType.TOKEN, chainId, tokenAddress, spenderAddress, account],

  queryFn: async () =>
    isNativeCoinAddress(tokenAddress ?? "")
      ? await nativeCoinFetcher(chainId, account)
      : await tokenFetcher(
          chainId,
          tokenAddress ?? "",
          spenderAddress,
          account
        ),

  enabled: Boolean(tokenAddress),
});
