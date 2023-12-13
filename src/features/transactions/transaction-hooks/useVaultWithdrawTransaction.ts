import { getDefaultProvider } from "ethers";
import { useCallback } from "react";

import { IGoodEntryVault__factory as VaultFactory } from "../../smart-contracts/types";
import { useBaseTransaction } from "../hooks/useBaseTransaction";

import type {
  DependantQueries,
  OnTransactionError,
  OnTransactionSuccess,
} from "../../shared/types/BaseTransaction";

export const useVaultWithdrawTransaction = (
  vaultAddress: string,
  dependantQueries?: DependantQueries,
  onTransactionSuccess?: OnTransactionSuccess,
  onTransactionError?: OnTransactionError
) => {
  const vaultContract = VaultFactory.connect(
    vaultAddress,
    getDefaultProvider()
  );
  const method = "withdraw";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    vaultContract,
    method,
    dependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const runTransaction = useCallback(
    (tokenAddress: string, amount: string) => {
      mutation.mutate([amount, tokenAddress, { gasLimit: 10_000_000 }]);
    },
    [mutation]
  );

  return {
    mutation,
    resetTransaction,
    transactionHash,
    runTransaction,
  };
};
