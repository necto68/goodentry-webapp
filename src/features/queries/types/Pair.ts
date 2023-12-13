import type { ChainId } from "../../web3/types/ChainId";

export interface Pair {
  id: string;
  chainId: ChainId;
  title: string;
  token0Address: string;
  token1Address: string;
  token0Symbol: string;
  token1Symbol: string;
}
