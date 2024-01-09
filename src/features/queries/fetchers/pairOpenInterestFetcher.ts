import { fromTokenAmount } from "../../input-card/helpers/tokenAmount";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { queryClient } from "../../shared/constants/queryClient";
import { toBig } from "../../shared/helpers/bigjs";
import {
  IGoodEntryVault__factory as VaultFactory,
  IGoodEntryPositionManager__factory as PositionManagerFactory,
} from "../../smart-contracts/types";
import { getProvider } from "../../web3/helpers/getProvider";
import { getTokenQueryOptions } from "../query-options-getters/getTokenQueryOptions";

import type { PairOpenInterest } from "../types/PairOpenInterest";

export const pairOpenInterestFetcher = async (
  pairId: string
): Promise<PairOpenInterest> => {
  const {
    chainId,
    addresses: {
      baseToken: baseTokenAddress,
      quoteToken: quoteTokenAddress,
      vault,
      positionManager,
    },
  } = getPairConfig(pairId);

  const provider = getProvider(chainId);

  const vaultContract = VaultFactory.connect(vault, provider);
  const positionManagerContract = PositionManagerFactory.connect(
    positionManager,
    provider
  );

  const [baseToken, quoteToken] = await Promise.all([
    queryClient.ensureQueryData(
      getTokenQueryOptions(chainId, baseTokenAddress)
    ),
    queryClient.ensureQueryData(
      getTokenQueryOptions(chainId, quoteTokenAddress)
    ),
  ]);

  const [rawReserves, rawLongOpenInterest, rawShortOpenInterest] =
    await Promise.all([
      vaultContract.getReserves(),
      positionManagerContract.openInterestCalls(),
      positionManagerContract.openInterestPuts(),
    ]);

  const longOpenInterest = fromTokenAmount(
    toBig(rawLongOpenInterest),
    baseToken
  );
  const shortOpenInterest = fromTokenAmount(
    toBig(rawShortOpenInterest),
    quoteToken
  );

  const baseAmount = toBig(rawReserves.baseAmount);
  const quoteAmount = toBig(rawReserves.quoteAmount);

  const longMaxOpenInterest = fromTokenAmount(baseAmount, baseToken).mul(0.6);
  const shortMaxOpenInterest = fromTokenAmount(quoteAmount, quoteToken).mul(
    0.6
  );

  return {
    id: pairId,
    longOpenInterest,
    shortOpenInterest,
    longMaxOpenInterest,
    shortMaxOpenInterest,
  };
};
