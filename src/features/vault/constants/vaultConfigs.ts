import { ChainId } from "../../web3/types/ChainId";
import { VaultStatus } from "../types/VaultStatus";

import type { VaultConfig } from "../types/VaultConfig";

export const vaultConfigs: VaultConfig[] = [
  // v1 vaults
  {
    id: "ETH-USDC",
    chainId: ChainId.ARBITRUM,
    pairId: "ETH-USDC",

    addresses: {
      vault: "0x41D0ebB0F0Bcf7A06E395D0551Cc695e4318594d",
    },

    status: VaultStatus.ACTIVE,
  },
  {
    id: "WBTC-USDC",
    chainId: ChainId.ARBITRUM,
    pairId: "WBTC-USDC",

    addresses: {
      vault: "0x819356bF26D384E7E70Cd26c07fc807e6B354F08",
    },

    status: VaultStatus.ACTIVE,
  },
  {
    id: "ARB-USDC",
    chainId: ChainId.ARBITRUM,
    pairId: "ARB-USDC",

    addresses: {
      vault: "0xbB59f5324FeA11E538fC7f46C3C7bFE5Ad36e8b9",
    },

    status: VaultStatus.ACTIVE,
  },
  {
    id: "GMX-USDC",
    chainId: ChainId.ARBITRUM,
    pairId: "GMX-USDC",

    addresses: {
      vault: "0x48E455852669ADB747b3D16f2Bd8b541D696B697",
    },

    status: VaultStatus.ACTIVE,
  },

  // v0 vaults
  {
    id: "ETH-USDC-V0",
    chainId: ChainId.ARBITRUM,
    pairId: "ETH-USDC",

    addresses: {
      vault: "0x0d3cAA624E3a0076A6bc96Ba8D632D37F460Bc74",
    },

    status: VaultStatus.DEPRECATED,
  },
  {
    id: "WBTC-USDC-V0",
    chainId: ChainId.ARBITRUM,
    pairId: "WBTC-USDC",

    addresses: {
      vault: "0xdcc16DEfe27cd4c455e5520550123B4054D1b432",
    },

    status: VaultStatus.DEPRECATED,
  },
  {
    id: "ARB-USDC-V0",
    chainId: ChainId.ARBITRUM,
    pairId: "ARB-USDC",

    addresses: {
      vault: "0x14475be7D59895739207a9E5518903f4B94345B7",
    },

    status: VaultStatus.DEPRECATED,
  },
  {
    id: "GMX-USDC-V0",
    chainId: ChainId.ARBITRUM,
    pairId: "GMX-USDC",

    addresses: {
      vault: "0xa82577af74ae9D450DC04dF62Fc5C14748a0B3Ae",
    },

    status: VaultStatus.DEPRECATED,
  },
];
