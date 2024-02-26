import { getApi } from "../../shared/helpers/getApi";

import type { VaultApiData } from "../types/VaultApiData";

export const getApiMethods = () => {
  const { get } = getApi();

  return {
    getVaultStats: async (
      address: string,
      chain = "arbitrum"
    ): Promise<VaultApiData> =>
      await get(`${chain}/vaultStats/${address}.json`).then(
        async (res) => (await res.json()) as VaultApiData
      ),
  };
};
