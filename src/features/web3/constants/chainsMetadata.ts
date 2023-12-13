import { ChainId } from "../types/ChainId";

import { zeroAddress } from "./addresses";

import type { ChainMetadata } from "../types/ChainMetadata";

export const chainsMetadata: ChainMetadata[] = [
  {
    chainId: ChainId.ARBITRUM,

    addresses: {
      priceOracle: "0x8A4236F5eF6158546C34Bd7BC2908B8106Ab1Ea1",
      optionsPositionsManager: "0xb9d2ab71A22D3a364D39dB2c579dFC56573f0229",
      lendingPoolGateway: "0x090E950666D3F2c5cf7fc98135D94287c83E0a85",
      vaultMigrationManager: "0xf350e47D1db625DA9cfa3A362A13839A550B15Ab",
    },
  },

  {
    // Polygon chain is only for development purposes
    chainId: ChainId.POLYGON,

    addresses: {
      priceOracle: "0x8A4236F5eF6158546C34Bd7BC2908B8106Ab1Ea1",
      optionsPositionsManager: zeroAddress,
      lendingPoolGateway: zeroAddress,
      vaultMigrationManager: zeroAddress,
    },
  },
];
