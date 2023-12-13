import { useContext } from "react";

import { PublicSaleModalTransactionsContext } from "../providers/PublicSaleModalTransactionsProvider";

export const usePublicSaleModalTransactions = () =>
  useContext(PublicSaleModalTransactionsContext);
