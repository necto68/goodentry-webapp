import { useQuery } from "@tanstack/react-query";

import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { getOptionBorrowRatesQueryOptions } from "../query-options-getters/getOptionBorrowRatesQueryOptions";

import type Big from "big.js";

export const useOptionBorrowRatesQuery = (
  pairId: string,
  positionSize: Big
) => {
  const { id } = getPairConfig(pairId);
  const queryOptions = getOptionBorrowRatesQueryOptions(id, positionSize);

  return useQuery(queryOptions);
};
