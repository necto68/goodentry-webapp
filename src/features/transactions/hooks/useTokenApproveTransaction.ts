import { constants, getDefaultProvider } from "ethers";
import { useCallback } from "react";

import { IERC20__factory as ERC20Factory } from "../../smart-contracts/types";
import { useWallet } from "../../wallet/hooks/useWallet";

import { useBaseTransaction } from "./useBaseTransaction";

import type {
  DependantQueries,
  OnTransactionSuccess,
  OnTransactionError,
} from "../../shared/types/BaseTransaction";

export const useTokenApproveTransaction = (
  tokenAddress: string,
  dependantQueries?: DependantQueries,
  onTransactionSuccess?: OnTransactionSuccess,
  onTransactionError?: OnTransactionError
) => {
  const { provider } = useWallet();

  const tokenContract = ERC20Factory.connect(
    tokenAddress,
    provider ?? getDefaultProvider()
  );
  const method = "approve";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    tokenContract,
    method,
    dependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const runTransaction = useCallback(
    (spenderAddress: string) => {
      mutation.mutate([spenderAddress, constants.MaxUint256]);
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
