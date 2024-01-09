import { getDefaultProvider } from "ethers";
import { useCallback } from "react";

import { IGoodEntryPositionManager__factory as PositionManagerFactory } from "../../smart-contracts/types";
import { useBaseTransaction } from "../hooks/useBaseTransaction";

import type {
  DependantQueries,
  OnTransactionSuccess,
  OnTransactionError,
} from "../../shared/types/BaseTransaction";

export const useClosePositionTransaction = (
  positionManagerAddress: string,
  dependantQueries?: DependantQueries,
  onTransactionSuccess?: OnTransactionSuccess,
  onTransactionError?: OnTransactionError
) => {
  const positionManagerContract = PositionManagerFactory.connect(
    positionManagerAddress,
    getDefaultProvider()
  );
  const method = "closePosition";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    positionManagerContract,
    method,
    dependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const runTransaction = useCallback(
    (positionId: number) => {
      mutation.mutate([positionId]);
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
