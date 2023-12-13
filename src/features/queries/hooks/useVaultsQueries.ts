import { useQueries } from "@tanstack/react-query";

import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { getVaultQueryOptions } from "../query-options-getters/getVaultQueryOptions";

export const useVaultsQueries = (vaultIds: string[]) => {
  const queries = vaultIds.map((vaultId) => {
    const { id } = getVaultConfig(vaultId);

    return getVaultQueryOptions(id);
  });

  return useQueries({ queries });
};
