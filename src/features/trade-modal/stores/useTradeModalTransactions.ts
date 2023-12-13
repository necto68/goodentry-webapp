import { useContext } from "react";

import { TradeModalTransactionsContext } from "../providers/TradeModalTransactionsProvider";

export const useTradeModalTransactions = () =>
  useContext(TradeModalTransactionsContext);
