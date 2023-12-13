import { basePriceFetcher } from "./basePriceFetcher";
import { baseTokenFetcher } from "./baseTokenFetcher";

import type { ChainId } from "../../web3/types/ChainId";
import type { Token } from "../types/Token";

export const tokenFetcher = async (
  chainId: ChainId,
  tokenAddress: string,
  spenderAddress?: string,
  account?: string
): Promise<Token> => {
  const [baseToken, price] = await Promise.all([
    baseTokenFetcher(chainId, tokenAddress, spenderAddress, account),
    basePriceFetcher(chainId, tokenAddress),
  ]);

  return {
    ...baseToken,
    price,
  };
};
