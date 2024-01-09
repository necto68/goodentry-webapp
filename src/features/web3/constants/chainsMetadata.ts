import { ChainId } from "../types/ChainId";

import type { ChainMetadata } from "../types/ChainMetadata";

export const chainsMetadata: ChainMetadata[] = [
  {
    chainId: ChainId.ARBITRUM,

    addresses: {
      priceOracle: "0x4A9EB72b72cB6fBbD8eF8C83342f252e519559e9",
      strikePriceManager: "0x6B49C1EFC952494ad7d32Cd04f9A6d85354a650E",
      vaultMigrationManager: "0xf350e47D1db625DA9cfa3A362A13839A550B15Ab",
    },
  },
];
