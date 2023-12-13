import { useContext } from "react";

import { LockWithdrawModalTransactionsContext } from "../providers/LockWithdrawModalTransactionsProvider";

export const useLockWithdrawModalTransactions = () =>
  useContext(LockWithdrawModalTransactionsContext);
