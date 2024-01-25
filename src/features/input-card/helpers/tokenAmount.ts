import Big from "big.js";

import { getExp } from "../../shared/helpers/bigjs";

import type { Token } from "../../queries/types/Token";

export const toTokenAmount = (value: Big, tokenData: Token) => {
  const multiplier = getExp(tokenData.decimals);

  return value.mul(multiplier).round(0, Big.roundDown);
};

export const fromTokenAmount = (value: Big, tokenData: Token) => {
  const divisor = getExp(tokenData.decimals);

  return value.div(divisor).round(tokenData.decimals);
};
