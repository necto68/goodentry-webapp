import type { ChainId } from "../../web3/types/ChainId";

export interface PublicSaleConfig {
  chainId: ChainId;

  addresses: {
    collateralToken: string;
    saleToken: string;
    crowdSale: string;
  };
}
