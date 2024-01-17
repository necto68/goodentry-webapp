import { useContext } from "react";

import { OpenPositionModalTransactionsContext } from "../providers/OpenPositionModalTransactionsProvider";

export const useOpenPositionModalTransactions = () =>
  useContext(OpenPositionModalTransactionsContext);
