import { getDefaultProvider, utils } from "ethers";
import { useCallback } from "react";

import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { useSelectedPairIdStore } from "../../protected-perps-page/stores/useSelectedPairIdStore";
import { IAaveLendingPool__factory as LendingPoolFactory } from "../../smart-contracts/types";
import { useWallet } from "../../wallet/hooks/useWallet";
import { getChainMetadata } from "../../web3/helpers/getChainMetadata";
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
  const { account = "" } = useWallet();
  const { selectedPairId } = useSelectedPairIdStore();
  const { chainId, poolId } = getPairConfig(selectedPairId);
  const {
    addresses: { optionsPositionsManager },
  } = getChainMetadata(chainId);

  const lendingPoolContract = LendingPoolFactory.connect(
    lendingPoolAddress,
    getDefaultProvider()
  );
  const method = "flashLoan";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    lendingPoolContract,
    method,
    dependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const runTransaction = useCallback(
    (swapSourceAddress: string, tickerAddress: string, amount: string) => {
      const parameters = utils.defaultAbiCoder.encode(
        ["uint8", "uint", "address", "address[]"],
        [0, poolId, account, [swapSourceAddress]]
      );

      mutation.mutate([
        optionsPositionsManager,
        [tickerAddress],
        [amount],
        [2],
        account,
        parameters,
        0,
      ]);
    },
    [poolId, account, mutation, optionsPositionsManager]
  );

  return {
    mutation,
    resetTransaction,
    transactionHash,
    runTransaction,
  };
};
