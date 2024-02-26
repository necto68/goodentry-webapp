import { useContext } from "react";

import { VaultStakeModalTransactionsContext } from "../providers/VaultStakeModalTransactionsProvider";

export const useVaultStakeModalTransactions = () =>
  useContext(VaultStakeModalTransactionsContext);
