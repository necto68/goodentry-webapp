import { useQuery } from "@tanstack/react-query";

import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { getPairQueryOptions } from "../query-options-getters/getPairQueryOptions";

export const usePairQuery = (pairId: string) => {
  const { id } = getPairConfig(pairId);
  const queryOptions = getPairQueryOptions(id);

  return useQuery(queryOptions);
};
