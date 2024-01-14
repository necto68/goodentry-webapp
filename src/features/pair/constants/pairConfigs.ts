import { ChainId } from "../../web3/types/ChainId";

import type { PairConfig } from "../types/PairConfig";

export const pairConfigs: PairConfig[] = [
  {
    id: "ETH-USDC",
    chainId: ChainId.ARBITRUM,
    chartSymbol: "ETHUSDT",

    addresses: {
      baseToken: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      quoteToken: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      vault: "0xd666156C473Cc9539CAaCc112B3A3590a895C861",
      positionManager: "0x0f652aAd7993D48bd6E876829aEDC068507a6cE3",
    },
  },
  {
    id: "ARB-USDC",
    chainId: ChainId.ARBITRUM,
    chartSymbol: "ARBUSDT",

    addresses: {
      baseToken: "0x912CE59144191C1204E64559FE8253a0e49E6548",
      quoteToken: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      vault: "0x419ae989a629Cc71834BDf6E3e8E33c9c3ED3Bb4",
      positionManager: "0x73cfCbD36C0bb5574f6062279b6076C5e321A4E2",
    },
  },
  {
    id: "WBTC-USDC",
    chainId: ChainId.ARBITRUM,
    chartSymbol: "BTCUSDT",

    addresses: {
      baseToken: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
      quoteToken: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      vault: "0x5f6aB9b043C43FaB8D2A51EA85b70495B5EeFD15",
      positionManager: "0xB7C602973c61eD1Fdb6F759559b217Af42066902",
    },
  },
  {
    id: "GMX-USDC",
    chainId: ChainId.ARBITRUM,
    chartSymbol: "GMXUSDT",

    addresses: {
      baseToken: "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
      quoteToken: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      vault: "0x21EB68Cc5a5d51b48e0DE743f321151523b7A15D",
      positionManager: "0xc03Ff47C5b9e437A573e927aF8b268dF892e4c14",
    },
  },
];
