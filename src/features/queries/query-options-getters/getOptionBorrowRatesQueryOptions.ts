import { optionBorrowRatesFetcher } from "../fetchers/optionBorrowRatesFetcher";
import { QueryType } from "../types/QueryType";

import type Big from "big.js";

export const getOptionBorrowRatesQueryOptions = (
  pairId: string,
  positionSize: Big
) => ({
  queryKey: [QueryType.OPTION_BORROW_RATES, pairId, positionSize.toString()],
  queryFn: async () => await optionBorrowRatesFetcher(pairId, positionSize),
});
