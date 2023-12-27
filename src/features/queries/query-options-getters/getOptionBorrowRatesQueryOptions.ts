import { optionBorrowRatesFetcher } from "../fetchers/optionBorrowRatesFetcher";
import { QueryType } from "../types/QueryType";

export const getOptionBorrowRatesQueryOptions = (pairId: string) => ({
  queryKey: [QueryType.OPTION_BORROW_RATES, pairId],
  queryFn: async () => await optionBorrowRatesFetcher(pairId),
});
