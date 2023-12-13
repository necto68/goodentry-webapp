import { useContext } from "react";

import { VaultModalTransactionsContext } from "../providers/VaultModalTransactionsProvider";

export const useVaultModalTransactions = () =>
  useContext(VaultModalTransactionsContext);
