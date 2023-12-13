import { getDefaultProvider } from "ethers";
import { useCallback } from "react";

import { IGoodEntryGovernanceToken__factory as GovernanceTokenFactory } from "../../smart-contracts/types";
import { useBaseTransaction } from "../hooks/useBaseTransaction";

import type {
  DependantQueries,
  OnTransactionError,
  OnTransactionSuccess,
} from "../../shared/types/BaseTransaction";

export const useGovernanceTokenUnlockTransaction = (
  governanceTokenAddress: string,
  dependantQueries?: DependantQueries,
  onTransactionSuccess?: OnTransactionSuccess,
  onTransactionError?: OnTransactionError
) => {
  const governanceTokenContract = GovernanceTokenFactory.connect(
    governanceTokenAddress,
    getDefaultProvider()
  );

  const method = "vest";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    governanceTokenContract,
    method,
    dependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const runTransaction = useCallback(
    (amount: string) => {
      mutation.mutate([amount]);
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
