import { getFormattedPairTitle } from "../../pair/helpers/getFormattedPairTitle";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { queryClient } from "../../shared/constants/queryClient";
import { getTokenQueryOptions } from "../query-options-getters/getTokenQueryOptions";

import type { Pair } from "../types/Pair";

export const pairFetcher = async (pairId: string): Promise<Pair> => {
  const {
    chainId,
    addresses: { baseToken: baseTokenAddress, quoteToken: quoteTokenAddress },
  } = getPairConfig(pairId);

  const [baseToken, quoteToken] = await Promise.all([
    queryClient.ensureQueryData(
      getTokenQueryOptions(chainId, baseTokenAddress)
    ),
    queryClient.ensureQueryData(
      getTokenQueryOptions(chainId, quoteTokenAddress)
    ),
  ]);

  const baseTokenSymbol = baseToken.symbol;
  const quoteTokenSymbol = quoteToken.symbol;

  const title = getFormattedPairTitle(baseTokenSymbol, quoteTokenSymbol);

  return {
    id: pairId,
    title,
    baseTokenSymbol,
    quoteTokenSymbol,
  };
};
