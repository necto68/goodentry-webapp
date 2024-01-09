import { toTokenAmount } from "../../input-card/helpers/tokenAmount";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { queryClient } from "../../shared/constants/queryClient";
import { getExp, toBig } from "../../shared/helpers/bigjs";
import { IGoodEntryPositionManager__factory as PositionManagerFactory } from "../../smart-contracts/types";
import { getProvider } from "../../web3/helpers/getProvider";
import { getPairPricesQueryOptions } from "../query-options-getters/getPairPricesQueryOptions";
import { getTokenQueryOptions } from "../query-options-getters/getTokenQueryOptions";

import type { OptionBorrowRates } from "../types/OptionBorrowRates";
import type Big from "big.js";

const defaultOptionBorrowRates = {
  lowerOptionHourlyBorrowRate: null,
  upperOptionHourlyBorrowRate: null,
};

export const optionBorrowRatesFetcher = async (
  pairId: string,
  positionSize: Big
): Promise<OptionBorrowRates> => {
  if (positionSize.lte(0)) {
    return defaultOptionBorrowRates;
  }

  const {
    chainId,
    addresses: {
      baseToken: baseTokenAddress,
      quoteToken: quoteTokenAddress,
      positionManager,
    },
  } = getPairConfig(pairId);

  const provider = getProvider(chainId);

  const positionManagerContract = PositionManagerFactory.connect(
    positionManager,
    provider
  );

  const [
    baseToken,
    quoteToken,
    { baseTokenPrice, lowerStrikePrice, upperStrikePrice },
  ] = await Promise.all([
    queryClient.ensureQueryData(
      getTokenQueryOptions(chainId, baseTokenAddress)
    ),
    queryClient.ensureQueryData(
      getTokenQueryOptions(chainId, quoteTokenAddress)
    ),
    queryClient.fetchQuery(getPairPricesQueryOptions(pairId)),
  ]);

  const baseTokenNotionalAmount = toTokenAmount(
    positionSize.div(baseTokenPrice),
    baseToken
  );
  const quoteTokenNotionalAmount = toTokenAmount(positionSize, quoteToken);

  const priceDivisor = getExp(8);
  const [rawLowerStrikePrice, rawUpperStrikePrice] = [
    lowerStrikePrice,
    upperStrikePrice,
  ].map((value) => toBig(value).mul(priceDivisor));

  const hoursToExpiry = 6;
  const secondsToExpiry = 60 * 60 * hoursToExpiry;

  const [rawLowerOptionPrice, rawUpperOptionPrice] = await Promise.all([
    positionManagerContract.getOptionPrice(
      false,
      rawLowerStrikePrice.toString(),
      quoteTokenNotionalAmount.toString(),
      secondsToExpiry
    ),
    positionManagerContract.getOptionPrice(
      true,
      rawUpperStrikePrice.toString(),
      baseTokenNotionalAmount.toString(),
      secondsToExpiry
    ),
  ]);

  const [lowerOptionPrice, upperOptionPrice] = [
    rawLowerOptionPrice,
    rawUpperOptionPrice,
  ].map((value) => toBig(value).div(priceDivisor).toNumber());

  const lowerOptionHourlyBorrowRate =
    lowerOptionPrice / lowerStrikePrice / hoursToExpiry;

  const upperOptionHourlyBorrowRate =
    upperOptionPrice / upperStrikePrice / hoursToExpiry;

  return {
    lowerOptionHourlyBorrowRate,
    upperOptionHourlyBorrowRate,
  };
};
