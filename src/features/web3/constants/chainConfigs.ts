import { ChainId } from "../types/ChainId";

import type { ChainConfig } from "../types/ChainConfig";

export const chainConfigs: ChainConfig[] = [
  {
    chainId: ChainId.MAINNET,
    title: "Ethereum",

    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
    },

    providers: {
      rpc: "https://rpc.ankr.com/eth",
    },

    urls: {
      explorer: "https://etherscan.io",
      explorerApi: "https://api.etherscan.io/",
    },

    addresses: {
      wrappedNativeCoinAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },

    keys: {
      explorerApi: "H9YG861JU9VGXZXDBTR2C6CE23J8NSXSGC",
    },
  },

  {
    chainId: ChainId.ARBITRUM,
    title: "Arbitrum",

    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
    },

    providers: {
      rpc: "https://arbitrum-one.public.blastapi.io",
    },

    urls: {
      explorer: "https://arbiscan.io",
    },

    addresses: {
      wrappedNativeCoinAddress: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
    },

    keys: {
      explorerApi: "WSN4AIK9NGQ5DE2824YNMAYIGV82EJ33TS",
    },
  },
  {
    chainId: ChainId.AVALANCHE,
    title: "Avalanche",

    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
    },

    providers: {
      rpc: "https://rpc.ankr.com/avalanche",
    },

    urls: {
      explorer: "https://snowtrace.io",
    },

    addresses: {
      wrappedNativeCoinAddress: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
    },

    keys: {},
  },
  {
    chainId: ChainId.POLYGON,
    title: "Polygon",

    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
    },

    providers: {
      rpc: "https://rpc.ankr.com/polygon",
    },

    urls: {
      explorer: "https://polygonscan.com",
      explorerApi: "https://api.polygonscan.com",
    },

    keys: {
      explorerApi: "PJMV9MU5ZK43D5JWZTJ28YJWJ51G76Q9U2",
    },

    addresses: {
      wrappedNativeCoinAddress: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    },
  },
];
