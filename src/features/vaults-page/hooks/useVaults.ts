import { useVaultsQueries } from "../../queries/hooks/useVaultsQueries";
import { getVaultIds } from "../../vault/helpers/getVaultIds";

export const useVaults = (vaultIds: string[] = getVaultIds()) => {
  const vaultsQueries = useVaultsQueries(vaultIds);

  return vaultsQueries.map((vaultQuery) => vaultQuery.data);
};
