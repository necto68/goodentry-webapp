import type Big from "big.js";

export enum PositionSide {
  LONG = "LONG",
  SHORT = "SHORT",
}
export interface Position {
  id: number;
  pairId: string;
  side: PositionSide;
  entryPrice: number;
  initialCollateral: Big;
  leverage: number;
  positionSize: Big;
  optionHourlyBorrowRate: number;
  runwayInSeconds: number;
  profitAndLossValue: Big;
  feesAccumulated: Big;
  feesMin: Big;
}
