import type { PositionSide } from "../../trade-panel/types/PositionSide";

export interface PositionHistoryItem {
  pnl: number;
  amount: number;
  pairId: string;
  chainId: number;
  timestamp: number;
  entryPrice: number;
  positionSide: PositionSide;
  transactionHash: string;
}
