import type { ChainId } from "./ChainId";

export interface ChainMetadata {
  chainId: ChainId;

  addresses: {
    priceOracle: string;
    optionsPositionsManager: string;
    vaultMigrationManager: string;
  };
}
