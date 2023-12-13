import type Big from "big.js";

export interface BaseToken {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: Big | null;
  allowance: Big;
  totalSupply: Big;
}

export interface Token extends BaseToken {
  price: number;
  underlyingAssetAddress?: string;
}

export type TokenData = Token | undefined;
