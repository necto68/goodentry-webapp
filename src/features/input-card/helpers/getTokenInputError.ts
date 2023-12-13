import { TokenInputError } from "../types/TokenInputError";

import {
  isInsufficientTokenBalance,
  isInsufficientTokenInput,
} from "./tokenBalance";

import type { TokenData } from "../../queries/types/Token";
import type { Big } from "big.js";

export const getTokenInputError = (
  value: Big,
  tokenData: TokenData
): TokenInputError | undefined => {
  if (isInsufficientTokenBalance(value, tokenData)) {
    return TokenInputError.INSUFFICIENT_TOKEN_BALANCE;
  }

  if (isInsufficientTokenInput(value, tokenData)) {
    return TokenInputError.INSUFFICIENT_TOKEN_INPUT;
  }

  return undefined;
};
