import { getZero, getExp } from "../../shared/helpers/bigjs";

import type { TokenData } from "../../queries/types/Token";
import type { Big } from "big.js";

export const isInsufficientTokenBalance = (value: Big, tokenData: TokenData) =>
  tokenData?.balance && value.gt(getZero())
    ? tokenData.balance.lt(value)
    : false;

export const isInsufficientTokenAllowance = (
  value: Big,
  tokenData: TokenData
) => (tokenData && value.gt(getZero()) ? tokenData.allowance.lt(value) : false);

export const isInsufficientTokenInput = (value: Big, tokenData: TokenData) =>
  tokenData && value.gt(getZero())
    ? getExp(-tokenData.decimals).gt(value)
    : false;
