import type { VaultStatus } from "./VaultStatus";
import type { ChainId } from "../../web3/types/ChainId";

export interface VaultConfig {
  id: string;
  chainId: ChainId;
  pairId: string;

  addresses: {
    vault: string;
  };

  status: VaultStatus;
}
