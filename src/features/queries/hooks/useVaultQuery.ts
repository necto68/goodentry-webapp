import { useQuery } from "@tanstack/react-query";

import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { getVaultQueryOptions } from "../query-options-getters/getVaultQueryOptions";

export const useVaultQuery = (vaultId: string) => {
  const { id } = getVaultConfig(vaultId);
  const options = getVaultQueryOptions(id);

  return useQuery(options);
};
