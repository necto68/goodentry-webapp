import { useApi } from "../../shared/hooks/useApi";

export interface VaultHistory {
  date: number;
  price: number;
  supplyRate: number;
  feesRate: number;
}

export interface VaultStats {
  maxTvl: number;
  price: number;
  supplyRate: number;
  feesRate: number;
  totalSupply: number;
  tvl: number;

  // TODO: need to be refactored
  // this field is from TickerStats, not from VaultStats
  feesAPR?: number;
}

export interface VaultHistoryData {
  [key: string]: VaultHistory[];
}

export interface VaultStatsData {
  [key: string]: VaultStats;
}

export const useVaultApiData = () => {
  const { get } = useApi();

  return {
    getHistory: async (chain = "arbitrum"): Promise<VaultHistoryData> =>
      await get(`/stats/${chain}/history.json`).then(
        async (res) => (await res.json()) as VaultHistoryData
      ),

    getStats: async (chain = "arbitrum"): Promise<VaultStatsData> =>
      await get(`/stats/${chain}/stats.json`).then(
        async (res) => (await res.json()) as VaultStatsData
      ),

    getStats7d: async (chain = "arbitrum"): Promise<VaultStatsData> =>
      await get(`/stats/${chain}/stats7d.json`).then(
        async (res) => (await res.json()) as VaultStatsData
      ),
  };
};
