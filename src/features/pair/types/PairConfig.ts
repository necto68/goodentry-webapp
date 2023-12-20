import type { ChainId } from "../../web3/types/ChainId";

export interface PairConfig {
  id: string;
  chainId: ChainId;
  chartSymbol: string;
  poolId: number;

  addresses: {
    uniswapPool: string;
    lendingPool: string;
    protocolDataProvider: string;
  };
}
