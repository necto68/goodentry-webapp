import type { ChainId } from "../../web3/types/ChainId";

export interface TokenQueryParameters {
  chainId: ChainId;
  tokenAddress: string | undefined;
  spenderAddress?: string;
}
