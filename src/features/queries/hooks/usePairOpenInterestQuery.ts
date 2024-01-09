import { useQuery } from "@tanstack/react-query";

import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { getPairOpenInterestQueryOptions } from "../query-options-getters/getPairOpenInterestQueryOptions";

export const usePairOpenInterestQuery = (pairId: string) => {
  const { id } = getPairConfig(pairId);
  const queryOptions = getPairOpenInterestQueryOptions(id);

  return useQuery(queryOptions);
};
