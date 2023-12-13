import type { ChainId } from "./ChainId";
import type { AddEthereumChainParameter } from "@web3-react/types";

export interface ChainConfig {
  chainId: ChainId;
  title: string;

  nativeCurrency: Pick<
    AddEthereumChainParameter["nativeCurrency"],
    "name" | "symbol"
  >;

  providers: {
    rpc: string;
  };

  urls: {
    explorer: string;
    explorerApi?: string;
  };

  keys: {
    explorerApi?: string;
  };

  addresses: {
    wrappedNativeCoinAddress: string;
  };
}
