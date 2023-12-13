import { chainConfigs } from "../constants/chainConfigs";

import type { ChainId } from "../types/ChainId";

export const chainConfigsMap = new Map(
  chainConfigs.map((config) => [config.chainId, config])
);

export const getChainConfig = (chainId: ChainId) => {
  const chainConfig = chainConfigsMap.get(chainId);

  if (chainConfig) {
    return chainConfig;
  }

  return chainConfigs[0];
};
