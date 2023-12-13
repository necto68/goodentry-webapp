import { pairConfigs } from "../constants/pairConfigs";

export const pairConfigsMap = new Map(
  pairConfigs.map((pair) => [pair.id, pair])
);

export const getPairConfig = (pairId: string) => {
  const pairConfig = pairConfigsMap.get(pairId);

  if (pairConfig) {
    return pairConfig;
  }

  return pairConfigs[0];
};
