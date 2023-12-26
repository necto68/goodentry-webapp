import { ChainId } from "../types/ChainId";

import type { ChainMetadata } from "../types/ChainMetadata";

export const chainsMetadata: ChainMetadata[] = [
  {
    chainId: ChainId.ARBITRUM,

    addresses: {
      priceOracle: "0x8A4236F5eF6158546C34Bd7BC2908B8106Ab1Ea1",
      strikePriceManager: "0x6B49C1EFC952494ad7d32Cd04f9A6d85354a650E",
      optionsPositionsManager: "0xb9d2ab71A22D3a364D39dB2c579dFC56573f0229",
      vaultMigrationManager: "0xf350e47D1db625DA9cfa3A362A13839A550B15Ab",
    },
  },
];
