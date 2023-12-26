import { ChainId } from "../../web3/types/ChainId";

import type { PairConfig } from "../types/PairConfig";

export const pairConfigs: PairConfig[] = [
  {
    id: "ETH-USDC",
    chainId: ChainId.ARBITRUM,
    chartSymbol: "ETHUSDT",

    addresses: {
      baseToken: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      quoteToken: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
      vault: "0x36003A975bFC56f650590C26B1479ba423217931",
      positionManager: "0x8c037eF65e1B3d2094AC75c301e2b1e6eA7e3D67",
    },
  },
  {
    id: "ARB-USDC",
    chainId: ChainId.ARBITRUM,
    chartSymbol: "ARBUSDT",

    addresses: {
      vault: "0xd5fE1A54fA642400ef559d866247cCE66049141B",
      baseToken: "0x912CE59144191C1204E64559FE8253a0e49E6548",
      quoteToken: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
      positionManager: "0x8D905e2F41430795293aca990b83798a91aF1D53",
    },
  },
];
