import { getDefaultProvider } from "ethers";
import { useCallback } from "react";

import { IGoodEntryCrowdSale__factory as CrowdSaleFactory } from "../../smart-contracts/types";
import { useBaseTransaction } from "../hooks/useBaseTransaction";

import type {
  DependantQueries,
  OnTransactionError,
  OnTransactionSuccess,
} from "../../shared/types/BaseTransaction";

export const useCrowdSaleDepositTransaction = (
  crowdSaleAddress: string,
  dependantQueries?: DependantQueries,
  onTransactionSuccess?: OnTransactionSuccess,
  onTransactionError?: OnTransactionError
) => {
  const crowdSaleContract = CrowdSaleFactory.connect(
    crowdSaleAddress,
    getDefaultProvider()
  );

  const method = "deposit";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    crowdSaleContract,
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
