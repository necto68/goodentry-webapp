import type { Token } from "./Token";
import type { PairConfig } from "../../pair/types/PairConfig";
import type Big from "big.js";

export interface TokenAmounts {
  amount0: Big;
  amount1: Big;
}

export interface Ticker {
  id: string;
  address: string;
  pairId: PairConfig["id"];
  symbol: string;
  strikePrice: number;
  tickerToken: Token;
  debtToken: Token;
  borrowRatePerHour: number;
  availableLiquidity: Big;
  tokenAmounts: TokenAmounts;
  tokenAmountsExcludingFees: TokenAmounts;
}
