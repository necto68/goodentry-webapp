import { getDefaultProvider } from "ethers";
import { useCallback } from "react";

import { IGoodEntryGovernanceToken__factory as GovernanceTokenFactory } from "../../smart-contracts/types";
import { useWallet } from "../../wallet/hooks/useWallet";
import { useBaseTransaction } from "../hooks/useBaseTransaction";

import type {
  DependantQueries,
  OnTransactionError,
  OnTransactionSuccess,
} from "../../shared/types/BaseTransaction";

export const useGovernanceTokenLockTransaction = (
  governanceTokenAddress: string,
  dependantQueries?: DependantQueries,
  onTransactionSuccess?: OnTransactionSuccess,
  onTransactionError?: OnTransactionError
) => {
  const { account = "" } = useWallet();

  const governanceTokenContract = GovernanceTokenFactory.connect(
    governanceTokenAddress,
    getDefaultProvider()
  );

  const method = "depositFor";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    governanceTokenContract,
    method,
    dependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const runTransaction = useCallback(
    (amount: string) => {
      mutation.mutate([account, amount]);
    },
    [mutation, account]
  );

  return {
    mutation,
    resetTransaction,
    transactionHash,
    runTransaction,
  };
};
