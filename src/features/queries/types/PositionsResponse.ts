export interface PositionResponseTransaction {
  date: number;
  user: string;
  type: string;
  hash: string;
  asset: string;
  amountDebt: string;
  strike: string;
  token0: string;
  token1: string;
  pnl: number;
  underlying: {
    amount0: string;
    amount1: string;
  };
  hasSwapped?: boolean;
  entry?: string;
}

export enum TransactionType {
  OPEN_POSITION = "BuyOptions",
  CLOSE_POSITION = "ClosePosition",
  LIQUIDATE_POSITION = "LiquidatePosition",
}

export interface PositionResponseData {
  vault: string;
  debt: string;
  amount0: number | string;
  amount1: number | string;
  avgEntry: number | null;
  entryAmount: number | null;
  entryUsd: number | null;
  strike: string;
}

export interface AccountData {
  tx: PositionResponseTransaction[];
  status: {
    [tickerAddress: string]: PositionResponseData;
  };
}
