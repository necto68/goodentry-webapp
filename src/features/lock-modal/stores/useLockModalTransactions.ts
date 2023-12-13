import { useContext } from "react";

import { LockModalTransactionsContext } from "../providers/LockModalTransactionsProvider";

export const useLockModalTransactions = () =>
  useContext(LockModalTransactionsContext);
