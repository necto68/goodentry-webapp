import { useContext } from "react";

import { LendingPoolModalTransactionsContext } from "../providers/LendingPoolModalTransactionsProvider";

export const useLendingPoolModalTransactions = () =>
  useContext(LendingPoolModalTransactionsContext);
