import { getDefaultProvider } from "ethers";
import { useCallback } from "react";

import { IGoodEntryCrowdSale__factory as CrowdSaleFactory } from "../../smart-contracts/types";
import { useBaseTransaction } from "../hooks/useBaseTransaction";

import type {
  DependantQueries,
  OnTransactionError,
  OnTransactionSuccess,
} from "../../shared/types/BaseTransaction";

export const useCrowdSaleClaimTransaction = (
  crowdSaleAddress: string,
  dependantQueries?: DependantQueries,
  onTransactionSuccess?: OnTransactionSuccess,
  onTransactionError?: OnTransactionError
) => {
  const crowdSaleContract = CrowdSaleFactory.connect(
    crowdSaleAddress,
    getDefaultProvider()
  );

  const method = "claim";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    crowdSaleContract,
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
