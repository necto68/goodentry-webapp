import { getChainConfig } from "./getChainConfig";

import type { ChainId } from "../types/ChainId";

export const getWrappedNativeCoinAddress = (chainId: ChainId) => {
  const chainConfig = getChainConfig(chainId);

  return chainConfig.addresses.wrappedNativeCoinAddress;
};
