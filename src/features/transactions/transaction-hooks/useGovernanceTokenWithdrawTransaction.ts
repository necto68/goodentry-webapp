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

export const useGovernanceTokenWithdrawTransaction = (
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

  const method = "withdraw";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    governanceTokenContract,
    method,
    dependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const runTransaction = useCallback(
    (unlockScheduleIndex: number) => {
      mutation.mutate([account, unlockScheduleIndex]);
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
