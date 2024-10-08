import type { PositionSide } from "../../trade-panel/types/PositionSide";
import type Big from "big.js";

export interface Position {
  id: number;
  pairId: string;
  timestamp: number;
  positionSide: PositionSide;
  entryPrice: number;
  initialCollateral: Big;
  leverage: number;
  positionSize: Big;
  optionHourlyBorrowRate: number;
  runwayInSeconds: number;
  profitAndLoss: number;
  profitAndLossPercentage: number;
  accumulatedFee: Big;
  minFee: Big;
}
