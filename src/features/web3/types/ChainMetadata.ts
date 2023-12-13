import type { ChainId } from "./ChainId";

export interface ChainMetadata {
  chainId: ChainId;

  addresses: {
    priceOracle: string;
    optionsPositionsManager: string;
    lendingPoolGateway: string;
    vaultMigrationManager: string;
  };
}
