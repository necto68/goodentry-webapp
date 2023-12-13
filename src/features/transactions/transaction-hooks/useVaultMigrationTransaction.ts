import { getDefaultProvider } from "ethers";
import { useCallback } from "react";

import { IGoodEntryVaultMigrationManager__factory as VaultMigrationManagerFactory } from "../../smart-contracts/types";
import { useWallet } from "../../wallet/hooks/useWallet";
import { useBaseTransaction } from "../hooks/useBaseTransaction";

import type {
  DependantQueries,
  OnTransactionError,
  OnTransactionSuccess,
} from "../../shared/types/BaseTransaction";

export const useVaultMigrationTransaction = (
  vaultMigrationManagerAddress: string,
  dependantQueries?: DependantQueries,
  onTransactionSuccess?: OnTransactionSuccess,
  onTransactionError?: OnTransactionError
) => {
  const { provider, account } = useWallet();

  const migrationManagerContract = VaultMigrationManagerFactory.connect(
    vaultMigrationManagerAddress,
    provider ?? getDefaultProvider()
  );

  const method = "migrate";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    migrationManagerContract,
    method,
    dependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const runTransaction = useCallback(
    async (
      firstTokenAddress: string,
      secondTokenAddress: string,
      sourceVaultAddress: string,
      targetVaultAddress: string
    ) => {
      const amount = 0;

      try {
        await migrationManagerContract.callStatic.migrate(
          amount,
          firstTokenAddress,
          sourceVaultAddress,
          targetVaultAddress,
          {
            from: account,
          }
        );

        mutation.mutate([
          amount,
          firstTokenAddress,
          sourceVaultAddress,
          targetVaultAddress,
        ]);
      } catch {
        mutation.mutate([
          amount,
          secondTokenAddress,
          sourceVaultAddress,
          targetVaultAddress,
        ]);
      }
    },
    [account, migrationManagerContract, mutation]
  );

  return {
    mutation,
    resetTransaction,
    transactionHash,
    runTransaction,
  };
};
