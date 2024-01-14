export interface VaultHistoricalData {
  day: number;
  value: number;
}

export interface VaultApiData {
  avgApr: number;
  totalApr: number;
  incentiveApr: number;
  priceHistory: VaultHistoricalData[];
  aprHistory: VaultHistoricalData[];
}
