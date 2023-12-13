import { chainsMetadata } from "../constants/chainsMetadata";

import type { ChainId } from "../types/ChainId";

export const chainsMetadataMap = new Map(
  chainsMetadata.map((metadata) => [metadata.chainId, metadata])
);

export const getChainMetadata = (chainId: ChainId) => {
  const chainMetadata = chainsMetadataMap.get(chainId);

  if (chainMetadata) {
    return chainMetadata;
  }

  return chainsMetadata[0];
};
