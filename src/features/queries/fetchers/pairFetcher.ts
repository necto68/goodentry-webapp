import { getFormattedPairTitle } from "../../pair/helpers/getFormattedPairTitle";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { queryClient } from "../../shared/constants/queryClient";
import { IUniswapV3Pool__factory as PoolFactory } from "../../smart-contracts/types";
import { getProvider } from "../../web3/helpers/getProvider";
import { getTokenQueryOptions } from "../query-options-getters/getTokenQueryOptions";

import type { Pair } from "../types/Pair";

export const pairFetcher = async (pairId: string): Promise<Pair> => {
  const {
    chainId,
    addresses: { uniswapPool },
  } = getPairConfig(pairId);

  const provider = getProvider(chainId);

  const poolContract = PoolFactory.connect(uniswapPool, provider);

  const [token0Address, token1Address] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
  ]);

  const [token0, token1] = await Promise.all([
    queryClient.ensureQueryData(getTokenQueryOptions(chainId, token0Address)),
    queryClient.ensureQueryData(getTokenQueryOptions(chainId, token1Address)),
  ]);

  const token0Symbol = token0.symbol;
  const token1Symbol = token1.symbol;

  const title = getFormattedPairTitle(token0Symbol, token1Symbol);

  return {
    id: pairId,
    chainId,
    title,
    token0Address,
    token1Address,
    token0Symbol,
    token1Symbol,
  };
};
