import type Big from "big.js";

export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: Big | null;
  allowance: Big;
  totalSupply: Big;
}

export type TokenData = Token | undefined;
