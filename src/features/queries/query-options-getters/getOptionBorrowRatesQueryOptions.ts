import { optionBorrowRatesFetcher } from "../fetchers/optionBorrowRatesFetcher";
import { QueryType } from "../types/QueryType";

import type { PairPrices } from "../types/PairPrices";
import type Big from "big.js";

export const getOptionBorrowRatesQueryOptions = (
  pairId: string,
  positionSize: Big,
  pairPrices: PairPrices | undefined
) => ({
  queryKey: [
    QueryType.OPTION_BORROW_RATES,
    pairId,
    positionSize.toString(),
    JSON.stringify(pairPrices),
  ],

  queryFn: async () =>
    await optionBorrowRatesFetcher(pairId, positionSize, pairPrices),

  cacheTime: 0,
});
