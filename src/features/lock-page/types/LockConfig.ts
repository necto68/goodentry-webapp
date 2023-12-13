import type { ChainId } from "../../web3/types/ChainId";

export interface LockConfig {
  chainId: ChainId;

  addresses: {
    lockToken: string;
    governanceToken: string;
    airdrop: string;
  };
}
