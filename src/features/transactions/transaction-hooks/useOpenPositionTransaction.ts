import { getDefaultProvider } from "ethers";
import { useCallback } from "react";

import { IERC20__factory as LendingPoolFactory } from "../../smart-contracts/types";
import { useBaseTransaction } from "../hooks/useBaseTransaction";

import type {
  DependantQueries,
  OnTransactionSuccess,
  OnTransactionError,
} from "../../shared/types/BaseTransaction";

export const useOpenPositionTransaction = (
  lendingPoolAddress: string,
  dependantQueries?: DependantQueries,
  onTransactionSuccess?: OnTransactionSuccess,
  onTransactionError?: OnTransactionError
) => {
  // const { account = "" } = useWallet();
  // const { selectedPairId } = useSelectedPairIdStore();
  // const { chainId } = getPairConfig(selectedPairId);
  // const {
  //   addresses: { optionsPositionsManager },
  // } = getChainMetadata(chainId);

  // TODO: v2 update
  const lendingPoolContract = LendingPoolFactory.connect(
    lendingPoolAddress,
    getDefaultProvider()
  );
  const method = "balanceOf";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    lendingPoolContract,
    method,
    dependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const runTransaction = useCallback(() => {
    mutation.mutate([""]);
  }, [mutation]);

  return {
    mutation,
    resetTransaction,
    transactionHash,
    runTransaction,
  };
};
