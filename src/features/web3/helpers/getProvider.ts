import { providers as multiCallProviders } from "@0xsequence/multicall";
import { providers as ethersProviders } from "ethers";

import { getChainConfig } from "./getChainConfig";

import type { ChainId } from "../types/ChainId";
import type { Provider } from "@ethersproject/providers";

const providersMap = new Map<ChainId, Provider>();

const getRpcProvider = (chainId: ChainId) => {
  const chainConfig = getChainConfig(chainId);
  const { rpc: rpcProviderUrl } = chainConfig.providers;

  const rpcProvider = new ethersProviders.JsonRpcProvider(rpcProviderUrl);

  return new multiCallProviders.MulticallProvider(rpcProvider);
};

export const getProvider = (chainId: ChainId) => {
  const providerFromMap = providersMap.get(chainId);

  if (providerFromMap) {
    return providerFromMap;
  }

  const provider = getRpcProvider(chainId);
  providersMap.set(chainId, provider);

  return provider;
};
