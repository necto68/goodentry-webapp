import type { LendingPool } from "../../queries/types/LendingPool";
import type { Token } from "../../queries/types/Token";

export const getAvailableToWithdrawBalance = (
  availableToWithdraw: LendingPool["availableToWithdraw"],
  aTokenData: Token
) => {
  const aTokenBalance = aTokenData.balance;

  if (!availableToWithdraw || !aTokenBalance) {
    return aTokenBalance;
  }

  const availableToWithdrawBalance = availableToWithdraw.div(aTokenData.price);

  return availableToWithdrawBalance.lt(aTokenBalance)
    ? availableToWithdrawBalance
    : aTokenBalance;
};
