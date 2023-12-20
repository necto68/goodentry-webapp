import type { PairConfig } from "../../pair/types/PairConfig";
import type Big from "big.js";

export enum PositionSide {
  LONG = "LONG",
  SHORT = "SHORT",
}
export interface Position {
  id: string;
  pairId: PairConfig["id"];
  side: PositionSide;
  size: Big;
  entryPrice: number;
  profitAndLossValue: Big;
  token0Amount: Big;
  token1Amount: Big;
}
