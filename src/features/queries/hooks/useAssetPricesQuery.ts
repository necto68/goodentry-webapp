import { useQuery } from "@tanstack/react-query";

import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { getAssetPricesQueryOptions } from "../query-options-getters/getAssetPricesQueryOptions";

export const useAssetPricesQuery = (pairId: string) => {
  const { id } = getPairConfig(pairId);
  const queryOptions = getAssetPricesQueryOptions(id);

  return useQuery(queryOptions);
};
