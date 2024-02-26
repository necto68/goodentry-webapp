import { pairConfigs } from "../constants/pairConfigs";

export const getPairIdsByChainId = (id: number) =>
  pairConfigs.filter(({ chainId }) => chainId === id);
