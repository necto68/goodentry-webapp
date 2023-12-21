import type { ChainId } from "../../web3/types/ChainId";

export interface PairConfig {
  id: string;
  chainId: ChainId;
  chartSymbol: string;

  addresses: {
    uniswapPool: string;
    protocolDataProvider: string;
  };
}
