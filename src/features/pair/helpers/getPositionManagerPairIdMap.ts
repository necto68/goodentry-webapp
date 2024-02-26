import { getPairIdsByChainId } from "./getPairIdsByChainId";

export const getPositionManagerPairIdMap = (
  chainId: number
): {
  [key: string]: string;
} => {
  const pairs: { [key: string]: string } = getPairIdsByChainId(chainId).reduce(
    (accumulator, { addresses, id }) => {
      const { positionManager } = addresses;
      return {
        ...accumulator,
        [positionManager.toLowerCase()]: id,
      };
    },
    {}
  );

  return pairs;
};
