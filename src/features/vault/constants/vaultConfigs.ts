import { ChainId } from "../../web3/types/ChainId";
import { VaultStatus } from "../types/VaultStatus";

import type { VaultConfig } from "../types/VaultConfig";

export const vaultConfigs: VaultConfig[] = [
  {
    id: "ETH-USDC",
    chainId: ChainId.ARBITRUM,
    pairId: "ETH-USDC",

    addresses: {
      vault: "0xd666156C473Cc9539CAaCc112B3A3590a895C861",
    },

    status: VaultStatus.ACTIVE_REWARDS,
  },
  {
    id: "ARB-USDC",
    chainId: ChainId.ARBITRUM,
    pairId: "ARB-USDC",

    addresses: {
      vault: "0x419ae989a629Cc71834BDf6E3e8E33c9c3ED3Bb4",
    },

    status: VaultStatus.ACTIVE_REWARDS,
  },
  {
    id: "WBTC-USDC",
    chainId: ChainId.ARBITRUM,
    pairId: "WBTC-USDC",

    addresses: {
      vault: "0x5f6aB9b043C43FaB8D2A51EA85b70495B5EeFD15",
    },

    status: VaultStatus.ACTIVE,
  },
  {
    id: "GMX-USDC",
    chainId: ChainId.ARBITRUM,
    pairId: "GMX-USDC",

    addresses: {
      vault: "0x21EB68Cc5a5d51b48e0DE743f321151523b7A15D",
    },

    status: VaultStatus.ACTIVE,
  },
];
