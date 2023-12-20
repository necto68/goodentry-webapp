import { ChainId } from "../../web3/types/ChainId";

import type { PairConfig } from "../types/PairConfig";

export const pairConfigs: PairConfig[] = [
  {
    id: "ETH-USDC",
    chainId: ChainId.ARBITRUM,
    chartSymbol: "ETHUSDT",
    poolId: 2,

    addresses: {
      uniswapPool: "0xc31e54c7a869b9fcbecc14363cf510d1c41fa443",
      lendingPool: "0x1259F436D981c1DA8b279205b5dc405B1f6Bf80b",
      protocolDataProvider: "0x84c68B1B73eBa04c1946EA42b712545eC6a15CDB",
    },
  },
  {
    id: "WBTC-USDC",
    chainId: ChainId.ARBITRUM,
    chartSymbol: "BTCUSDT",
    poolId: 10,

    addresses: {
      uniswapPool: "0xac70bd92f89e6739b3a08db9b6081a923912f73d",
      lendingPool: "0x714dBe5C00b99f9AC220b45124568d047CB56E62",
      protocolDataProvider: "0x2a495eB6a7dAe9932d90c8E851531A04bb81EeDC",
    },
  },
  {
    id: "ARB-USDC",
    chainId: ChainId.ARBITRUM,
    chartSymbol: "ARBUSDT",
    poolId: 8,

    addresses: {
      uniswapPool: "0xcda53b1f66614552f834ceef361a8d12a0b8dad8",
      lendingPool: "0x06e81a9d8b9BDF50A48666a90c03Dd1Ed0e12eeb",
      protocolDataProvider: "0x13d5C5F90726E6812d8e8D8Ad4433d13b94f10F2",
    },
  },
  {
    id: "GMX-USDC",
    chainId: ChainId.ARBITRUM,
    chartSymbol: "GMXUSDT",
    poolId: 4,

    addresses: {
      uniswapPool: "0xbed2589fefae17d62a8a4fdac92fa5895cae90d2",
      lendingPool: "0x25f1fEB4de0AC6A6421Ac211949e771c1b3C85bc",
      protocolDataProvider: "0x89B9Ca286B26e9D232d6B42A9F22C656d9C0b37e",
    },
  },
];
