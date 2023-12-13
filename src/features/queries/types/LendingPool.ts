import type Big from "big.js";

interface DefaultLendingPoolData {
  id: string;
  pairId: string;
  address: string;
  gatewayAddress: string;
  aToken0Address: string;
  aToken1Address: string;
  availableCollateral: null;
  totalCollateral: null;
  totalDebt: null;
  liquidationThreshold: null;
  loanToValue: null;
  maxLeverage: null;
  availableToWithdraw: null;
}

interface LendingPoolData {
  id: string;
  pairId: string;
  address: string;
  gatewayAddress: string;
  aToken0Address: string;
  aToken1Address: string;
  availableCollateral: Big;
  totalCollateral: Big;
  totalDebt: Big;
  liquidationThreshold: number;
  loanToValue: number;
  maxLeverage: number;
  availableToWithdraw: Big;
}

export type LendingPool = DefaultLendingPoolData | LendingPoolData;
