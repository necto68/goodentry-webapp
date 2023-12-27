import { useQuery } from "@tanstack/react-query";

import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { getOptionBorrowRatesQueryOptions } from "../query-options-getters/getOptionBorrowRatesQueryOptions";

export const useOptionBorrowRatesQuery = (pairId: string) => {
  const { id } = getPairConfig(pairId);
  const queryOptions = getOptionBorrowRatesQueryOptions(id);

  return useQuery(queryOptions);
};
