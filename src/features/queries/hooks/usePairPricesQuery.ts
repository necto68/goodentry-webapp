import { useQuery } from "@tanstack/react-query";

import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { getPairPricesQueryOptions } from "../query-options-getters/getPairPricesQueryOptions";

export const usePairPricesQuery = (pairId: string) => {
  const { id } = getPairConfig(pairId);
  const queryOptions = getPairPricesQueryOptions(id);

  return useQuery(queryOptions);
};
