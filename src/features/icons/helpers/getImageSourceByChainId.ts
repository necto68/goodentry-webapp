import { ChainId } from "../../web3/types/ChainId";
import { eth, matic, arb, avax } from "../coins";

const chainsIcons: { [key in ChainId]?: string } = {
  [ChainId.MAINNET]: eth,
  [ChainId.POLYGON]: matic,
  [ChainId.ARBITRUM]: arb,
  [ChainId.AVALANCHE]: avax,
};

export const getImageSourceByChainId = (chainId: ChainId) => {
  if (chainsIcons[chainId]) {
    return chainsIcons[chainId];
  }

  return null;
};
