import type Big from "big.js";

export enum PublicSaleStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  ENDED = "ENDED",
}

export interface PublicSaleData {
  collateralTokenDeposited: Big | null;
  collateralTokenTotalDeposited: Big;
  collateralTokenCap: Big;
  saleTokenPrice: number;
  saleTokenBought: Big | null;
  saleTokenTotalBought: Big;
  saleTokenCap: Big;
  isSaleTokenClaimable: boolean;
  startTimestamp: number;
  endTimestamp: number;
  isPaused: boolean;
  status: PublicSaleStatus;
}
