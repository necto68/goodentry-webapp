import { getDefaultProvider } from "ethers";
import { useCallback } from "react";

import { isNativeCoinAddress } from "../../queries/helpers/nativeCoin";
import { IGoodEntryVault__factory as VaultFactory } from "../../smart-contracts/types";
import { getWrappedNativeCoinAddress } from "../../web3/helpers/getWrappedNativeCoinAddress";
import { useBaseTransaction } from "../hooks/useBaseTransaction";

import type {
  DependantQueries,
  OnTransactionError,
  OnTransactionSuccess,
} from "../../shared/types/BaseTransaction";
import type { ChainId } from "../../web3/types/ChainId";

export const useVaultDepositTransaction = (
  vaultAddress: string,
  chainId: ChainId,
  dependantQueries?: DependantQueries,
  onTransactionSuccess?: OnTransactionSuccess,
  onTransactionError?: OnTransactionError
) => {
  const vaultContract = VaultFactory.connect(
    vaultAddress,
    getDefaultProvider()
  );

  const method = "deposit";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    vaultContract,
    method,
    dependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const runTransaction = useCallback(
    (tokenAddress: string, amount: string) => {
      const wrappedNativeCoinAddress = getWrappedNativeCoinAddress(chainId);
      const isNativeCoin = isNativeCoinAddress(tokenAddress);

      if (isNativeCoin) {
        mutation.mutate([wrappedNativeCoinAddress, 0, { value: amount }]);
      } else {
        mutation.mutate([tokenAddress, amount]);
      }
    },
    [chainId, mutation]
  );

  return {
    mutation,
    resetTransaction,
    transactionHash,
    runTransaction,
  };
};
