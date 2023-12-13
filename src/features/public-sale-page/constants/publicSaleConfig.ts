import { ChainId } from "../../web3/types/ChainId";

import type { PublicSaleConfig } from "../types/PublicSaleConfig";

export const publicSaleConfig: PublicSaleConfig = {
  chainId: ChainId.ARBITRUM,

  addresses: {
    collateralToken: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    saleToken: "0x17176a9868f321411b15ccb9b934cf95597e89c4",
    crowdSale: "0x553fe5115392e2f024f1099e41a2f8ccb5ed2bca",
  },
};
