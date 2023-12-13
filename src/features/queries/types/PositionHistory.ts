import type { TransactionType } from "./PositionsResponse";
import type { PairConfig } from "../../pair/types/PairConfig";
import type Big from "big.js";

export enum PositionSide {
  LONG = "LONG",
  SHORT = "SHORT",
}

export interface PositionHistory {
  pairId: PairConfig["id"];
  chainId: PairConfig["chainId"];
  hash: string;
  entry?: string;
  date: Date;
  type: TransactionType;
  amount: Big;
  symbol: string;
  tickerSymbol: string;
  side: string;
  strike: string;
  pnl: number;
}
