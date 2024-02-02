import { useQuery } from "@tanstack/react-query";

import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { getOptionBorrowRatesQueryOptions } from "../query-options-getters/getOptionBorrowRatesQueryOptions";

import type { PairPrices } from "../types/PairPrices";
import type Big from "big.js";

export const useOptionBorrowRatesQuery = (
  pairId: string,
  positionSize: Big,
  pairPrices: PairPrices | undefined
) => {
  const { id } = getPairConfig(pairId);

  const queryOptions = getOptionBorrowRatesQueryOptions(
    id,
    positionSize,
    pairPrices
  );

  return useQuery(queryOptions);
};
