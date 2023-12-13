import { vaultTokenFetcher } from "../fetchers/vaultTokenFetcher";
import { QueryType } from "../types/QueryType";

import type { ChainId } from "../../web3/types/ChainId";

export const getVaultTokenQueryOptions = (
  chainId: ChainId,
  tokenAddress: string | null,
  spenderAddress?: string,
  account?: string
) => ({
  queryKey: [
    QueryType.VAULT_TOKEN,
    chainId,
    tokenAddress,
    spenderAddress,
    account,
  ],

  queryFn: async () =>
    await vaultTokenFetcher(
      chainId,
      tokenAddress ?? "",
      spenderAddress,
      account
    ),

  enabled: Boolean(tokenAddress),
});
