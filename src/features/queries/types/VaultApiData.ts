export interface VaultHistoricalData {
  day: number;
  value: number;
}

export interface VaultApiData {
  feesAnnualPercentageRate: number;
  rewardsAnnualPercentageRate: number;
  totalAnnualPercentageRate: number;
  priceHistory: VaultHistoricalData[];
  annualPercentageRateHistory: VaultHistoricalData[];
}
