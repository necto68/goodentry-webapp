import { getDefaultProvider } from "ethers";
import { useCallback } from "react";

import { IGoodEntryOptionsPositionsManager__factory as OptionsPositionsManager } from "../../smart-contracts/types";
import { useBaseTransaction } from "../hooks/useBaseTransaction";

import type {
  DependantQueries,
  OnTransactionSuccess,
  OnTransactionError,
} from "../../shared/types/BaseTransaction";

export const useClosePositionTransaction = (
  optionsPositionsManager: string,
  dependantQueries?: DependantQueries,
  onTransactionSuccess?: OnTransactionSuccess,
  onTransactionError?: OnTransactionError
) => {
  const optionsPositionsManagerContract = OptionsPositionsManager.connect(
    optionsPositionsManager,
    getDefaultProvider()
  );
  const method = "closePosition";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    optionsPositionsManagerContract,
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
