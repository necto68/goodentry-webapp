import { useQueries } from "@tanstack/react-query";

import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { getPairQueryOptions } from "../query-options-getters/getPairQueryOptions";

export const usePairsQueries = (pairIds: string[]) => {
  const queries = pairIds.map((pairId) => {
    const { id } = getPairConfig(pairId);

    return getPairQueryOptions(id);
  });

  return useQueries({ queries });
};
