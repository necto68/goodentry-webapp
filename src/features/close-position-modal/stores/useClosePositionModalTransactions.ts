import { useContext } from "react";

import { ClosePositionModalTransactionsContext } from "../providers/ClosePositionModalTransactionsProvider";

export const useClosePositionModalTransactions = () =>
  useContext(ClosePositionModalTransactionsContext);
