import { getDefaultProvider } from "ethers";
import { useCallback } from "react";

import { IGoodEntryAirdrop__factory as AirdropFactory } from "../../smart-contracts/types";
import { useBaseTransaction } from "../hooks/useBaseTransaction";

import type {
  DependantQueries,
  OnTransactionError,
  OnTransactionSuccess,
} from "../../shared/types/BaseTransaction";

export const useAirdropClaimTransaction = (
  airdropAddress: string,
  dependantQueries?: DependantQueries,
  onTransactionSuccess?: OnTransactionSuccess,
  onTransactionError?: OnTransactionError
) => {
  const airdropContract = AirdropFactory.connect(
    airdropAddress,
    getDefaultProvider()
  );

  const method = "claim";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    airdropContract,
    method,
    dependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const runTransaction = useCallback(
    (proof: string[], amount: string) => {
      mutation.mutate([proof, amount]);
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
