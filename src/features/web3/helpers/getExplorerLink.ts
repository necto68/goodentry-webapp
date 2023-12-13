import { getChainConfig } from "./getChainConfig";

import type { ChainId } from "../types/ChainId";
import type { ExplorerLinkType } from "../types/ExplorerLinkType";

export const getExplorerLink = (
  chainId: ChainId,
  linkType: ExplorerLinkType,
  hash: string
) => {
  const { urls } = getChainConfig(chainId);
  const { explorer } = urls;

  return [explorer, linkType, hash].join("/");
};
