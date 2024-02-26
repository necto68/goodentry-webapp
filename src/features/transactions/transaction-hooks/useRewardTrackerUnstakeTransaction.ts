import { getDefaultProvider } from "ethers";
import { useCallback } from "react";

import { IGoodEntryRewardTracker__factory as RewardTrackerFactory } from "../../smart-contracts/types";
import { useBaseTransaction } from "../hooks/useBaseTransaction";

import type {
  DependantQueries,
  OnTransactionError,
  OnTransactionSuccess,
} from "../../shared/types/BaseTransaction";

export const useRewardTrackerUnstakeTransaction = (
  rewardTrackerAddress: string,
  dependantQueries?: DependantQueries,
  onTransactionSuccess?: OnTransactionSuccess,
  onTransactionError?: OnTransactionError
) => {
  const rewardTrackerContract = RewardTrackerFactory.connect(
    rewardTrackerAddress,
    getDefaultProvider()
  );

  const method = "unstake(uint256)";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    rewardTrackerContract,
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
