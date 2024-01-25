import { getDefaultProvider } from "ethers";
import { useCallback } from "react";

import { IGoodEntryRewardTracker__factory as RewardTrackerFactory } from "../../smart-contracts/types";
import { useBaseTransaction } from "../hooks/useBaseTransaction";

import type {
  DependantQueries,
  OnTransactionError,
  OnTransactionSuccess,
} from "../../shared/types/BaseTransaction";

export const useRewardTrackerClaimTransaction = (
  rewardTrackerAddress: string,
  dependantQueries?: DependantQueries,
  onTransactionSuccess?: OnTransactionSuccess,
  onTransactionError?: OnTransactionError
) => {
  const rewardTrackerContract = RewardTrackerFactory.connect(
    rewardTrackerAddress,
    getDefaultProvider()
  );

  const method = "claim";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    rewardTrackerContract,
    method,
    dependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const runTransaction = useCallback(() => {
    mutation.mutate([]);
  }, [mutation]);

  return {
    mutation,
    resetTransaction,
    transactionHash,
    runTransaction,
  };
};
