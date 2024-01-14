import { toBig } from "../../shared/helpers/bigjs";
import { getApiMethods } from "../../vault/helpers/getApiMethods";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { VaultStatus } from "../../vault/types/VaultStatus";

import type { VaultApiData } from "../types/VaultApiData";

export const vaultApiDataFetcher = async (
  vaultId: string
): Promise<VaultApiData> => {
  if (!vaultId) {
    return {
      avgApr: 0,
      totalApr: 0,
      incentiveApr: 0,
      aprHistory: [],
      priceHistory: [],
    };
  }

  const { status, addresses } = getVaultConfig(vaultId);

  const { vault } = addresses;

  const { getVaultStats } = getApiMethods();
  const vaultData = await getVaultStats(vault);

  const { history: completeVaultsHistory } = vaultData;

  const vaultHistory = completeVaultsHistory.slice(-30, 30);

  const tvl = toBig(vaultHistory[vaultHistory.length - 1].tvlX8).div(1e8);

  const avgApr = toBig(
    Object.values(vaultHistory).reduce(
      (accumulator: number, { feesX8, tvlX8 }) => accumulator + feesX8 / tvlX8,
      0
    )
  )
    .mul(36_500)
    .div(vaultHistory.length)
    .div(1e2)
    .toNumber();

  const incentiveApr =
    status === VaultStatus.ACTIVE_REWARDS
      ? tvl.div(365 * 2.15 * 400).toNumber()
      : 0;

  const totalApr = avgApr + incentiveApr;

  const aprHistory = vaultHistory.map(({ feesX8, tvlX8, day }) => ({
    day,
    value: toBig(feesX8).div(tvlX8).mul(36_500).toNumber(),
  }));

  const priceHistory = vaultHistory.map(({ vaultPrice, day }) => ({
    day,
    value: toBig(vaultPrice).div(1e8).toNumber(),
  }));

  return {
    avgApr,
    totalApr,
    incentiveApr,
    aprHistory,
    priceHistory,
  };
};
