import Big from "big.js";

import { getAvailableMargin } from "../../shared/helpers/formatters";

import type { LendingPool } from "../../queries/types/LendingPool";
import type { Ticker } from "../../queries/types/Ticker";
import type { TokenData } from "../../queries/types/Token";

export const getTickerAsTokenData = (
  ticker: Ticker | undefined,
  lendingPool: LendingPool | undefined
): TokenData => {
  const { address, tickerToken } = ticker ?? {};
  const { availableCollateral, maxLeverage } = lendingPool ?? {};

  if (
    !address ||
    !tickerToken ||
    !availableCollateral ||
    maxLeverage === undefined
  ) {
    return undefined;
  }

  const { name, allowance, decimals, totalSupply } = tickerToken;

  const availableMargin = getAvailableMargin(availableCollateral, maxLeverage);

  const symbol = "USDC.e";
  const balance = availableMargin.round(6, Big.roundDown);
  const price = 1;

  return {
    symbol,
    name,
    address,
    allowance,
    decimals,
    balance,
    totalSupply,
    price,
  };
};
