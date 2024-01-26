import { toBig } from "../../shared/helpers/bigjs";
import { getApiMethods } from "../../vault/helpers/getApiMethods";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { VaultStatus } from "../../vault/types/VaultStatus";

import type { VaultApiData } from "../types/VaultApiData";

const defaultVaultApiData: VaultApiData = {
  feesAnnualPercentageRate: 0,
  totalAnnualPercentageRate: 0,
  rewardsAnnualPercentageRate: 0,
  annualPercentageRateHistory: [],
  priceHistory: [],
};

export const vaultApiDataFetcher = async (
  vaultId: string
): Promise<VaultApiData> => {
  if (!vaultId) {
    return defaultVaultApiData;
  }

  const { status, addresses } = getVaultConfig(vaultId);

  const { vault } = addresses;

  const { getVaultStats } = getApiMethods();
  const vaultData = await getVaultStats(vault);

  const { history: completeVaultsHistory } = vaultData;

  const vaultHistory = completeVaultsHistory.slice(-30, 30);

  const tvl = toBig(vaultHistory[vaultHistory.length - 1].tvlX8).div(1e8);

  const feesAnnualPercentageRate = toBig(
    Object.values(vaultHistory).reduce(
      (accumulator: number, { feesX8, tvlX8 }) => accumulator + feesX8 / tvlX8,
      0
    )
  )
    .mul(365)
    .div(vaultHistory.length)
    .toNumber();

  // TODO: remove this when we have a better way to calculate this
  const daysPerYear = 365;
  const arbPrice = 1.67;
  const arbPerDay = 400;

  const rewardsAnnualPercentageRate =
    status === VaultStatus.ACTIVE_REWARDS
      ? tvl.div(daysPerYear * arbPrice * arbPerDay).toNumber()
      : 0;

  const totalAnnualPercentageRate =
    feesAnnualPercentageRate + rewardsAnnualPercentageRate;

  const annualPercentageRateHistory = vaultHistory.map(
    ({ feesX8, tvlX8, day }) => ({
      day,
      value: toBig(feesX8).div(tvlX8).mul(36_500).toNumber(),
    })
  );

  const priceHistory = vaultHistory.map(({ vaultPrice, day }) => ({
    day,
    value: toBig(vaultPrice).div(1e8).toNumber(),
  }));

  return {
    feesAnnualPercentageRate,
    rewardsAnnualPercentageRate,
    totalAnnualPercentageRate,
    annualPercentageRateHistory,
    priceHistory,
  };
};
