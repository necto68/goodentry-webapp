import type { ChainId } from "./ChainId";

export interface ChainMetadata {
  chainId: ChainId;

  addresses: {
    priceOracle: string;
    strikePriceManager: string;
    referralManager: string;
    vaultMigrationManager: string;
  };
}
