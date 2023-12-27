import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { queryClient } from "../../shared/constants/queryClient";
import { getExp, toBig } from "../../shared/helpers/bigjs";
import { IGoodEntryOptionsPositionsManager__factory as OptionsPositionManagerFactory } from "../../smart-contracts/types";
import { getProvider } from "../../web3/helpers/getProvider";
import { getPairPricesQueryOptions } from "../query-options-getters/getPairPricesQueryOptions";

import type { OptionBorrowRates } from "../types/OptionBorrowRates";

export const optionBorrowRatesFetcher = async (
  pairId: string
): Promise<OptionBorrowRates> => {
  const {
    chainId,
    addresses: { positionManager },
  } = getPairConfig(pairId);

  const provider = getProvider(chainId);

  const optionsPositionManagerContract = OptionsPositionManagerFactory.connect(
    positionManager,
    provider
  );

  const [{ lowerStrikePrice, upperStrikePrice }] = await Promise.all([
    queryClient.ensureQueryData(getPairPricesQueryOptions(pairId)),
  ]);

  const priceDivisor = getExp(8);
  const [rawLowerStrikePrice, rawUpperStrikePrice] = [
    lowerStrikePrice,
    upperStrikePrice,
  ].map((value) => toBig(value).mul(priceDivisor));

  const hoursToExpiry = 6;
  const secondsToExpiry = 60 * 60 * hoursToExpiry;

  const [rawLowerOptionPrice, rawUpperOptionPrice] = await Promise.all([
    optionsPositionManagerContract.getOptionPrice(
      false,
      rawLowerStrikePrice.toString(),

      // TODO: update later
      "1",
      secondsToExpiry
    ),
    optionsPositionManagerContract.getOptionPrice(
      true,
      rawUpperStrikePrice.toString(),

      // TODO: update later
      "1",
      secondsToExpiry
    ),
  ]);

  const [lowerOptionPrice, upperOptionPrice] = [
    rawLowerOptionPrice,
    rawUpperOptionPrice,
  ].map((value) => toBig(value).div(priceDivisor).toNumber());

  const lowerOptionBorrowRate =
    lowerOptionPrice / lowerStrikePrice / hoursToExpiry;

  const upperOptionBorrowRate =
    upperOptionPrice / upperStrikePrice / hoursToExpiry;

  return {
    lowerOptionBorrowRate,
    upperOptionBorrowRate,
  };
};
