import { useQuery } from "@tanstack/react-query";

import { getVaultApiDataQueryOptions } from "../query-options-getters/getVaultApiDataQueryOptions";

export const useVaultApiDataQuery = (vaultAddress: string) => {
  const options = getVaultApiDataQueryOptions(vaultAddress);

  return useQuery(options);
};
