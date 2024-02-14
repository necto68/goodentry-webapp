import { useContext } from "react";

import { ReferralModalTransactionsContext } from "../providers/ReferralModalTransactionsProvider";

export const useReferralModalTransactions = () =>
  useContext(ReferralModalTransactionsContext);
