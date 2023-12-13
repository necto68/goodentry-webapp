import { getDefaultProvider } from "ethers";
import { useCallback } from "react";

import { IGoodEntryOptionsPositionsManager__factory as OptionsPositionsManager } from "../../smart-contracts/types";
import { useWallet } from "../../wallet/hooks/useWallet";
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
  const { account = "" } = useWallet();

  const optionsPositionsManagerContract = OptionsPositionsManager.connect(
    optionsPositionsManager,
    getDefaultProvider()
  );
  const method = "close";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    optionsPositionsManagerContract,
    method,
    dependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const runTransaction = useCallback(
    (
      poolId: number,
      tickerAddress: string,
      amount: string,
      assetAddress: string
    ) => {
      mutation.mutate([poolId, account, tickerAddress, amount, assetAddress]);
    },
    [account, mutation]
  );

  return {
    mutation,
    resetTransaction,
    transactionHash,
    runTransaction,
  };
};
