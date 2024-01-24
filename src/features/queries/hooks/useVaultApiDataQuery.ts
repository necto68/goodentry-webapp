import { useQuery } from "@tanstack/react-query";

import { getVaultApiDataQueryOptions } from "../query-options-getters/getVaultApiDataQueryOptions";

export const useVaultApiDataQuery = (vaultId: string) => {
  const options = getVaultApiDataQueryOptions(vaultId);

  return useQuery(options);
};
