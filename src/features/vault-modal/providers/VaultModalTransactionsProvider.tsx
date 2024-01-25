import { createContext, useMemo } from "react";

import { defaultUseMutationResult } from "../../shared/constants/defaultUseMutationResult";
import { useToast } from "../../toast/hooks/useToast";
import { ToastType } from "../../toast/types/ToastType";
import { useTokenApproveTransaction } from "../../transactions/hooks/useTokenApproveTransaction";
import { useVaultDepositTransaction } from "../../transactions/transaction-hooks/useVaultDepositTransaction";
import { useVaultMigrationTransaction } from "../../transactions/transaction-hooks/useVaultMigrationTransaction";
import { useVaultWithdrawTransaction } from "../../transactions/transaction-hooks/useVaultWithdrawTransaction";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { useVaultStakeModalQueries } from "../../vault-stake-modal/hooks/useVaultStakeModalQueries";
import { getChainMetadata } from "../../web3/helpers/getChainMetadata";
import { useVaultModalQueries } from "../hooks/useVaultModalQueries";
import { useVaultModalTokenInputState } from "../hooks/useVaultModalTokenInputState";
import { useVaultModalState } from "../stores/useVaultModalState";

import type { VaultModalTransactions } from "../types/VaultModalTransactions";
import type { FC, ReactNode } from "react";

interface VaultModalTransactionsProviderProps {
  readonly children: ReactNode;
}

export const VaultModalTransactionsContext =
  createContext<VaultModalTransactions>({
    tokenApproveTransaction: defaultUseMutationResult,
    vaultTokenApproveTransaction: defaultUseMutationResult,
    depositTransaction: defaultUseMutationResult,
    withdrawTransaction: defaultUseMutationResult,
    migrateTransaction: defaultUseMutationResult,
  });

export const VaultModalTransactionsProvider: FC<
  VaultModalTransactionsProviderProps
> = ({ children }) => {
  const toast = useToast();

  const { vaultId, depositTokenInputState, withdrawTokenInputState } =
    useVaultModalState();

  const {
    chainId,
    addresses: { vault },
  } = getVaultConfig(vaultId);

  const {
    addresses: { vaultMigrationManager },
  } = getChainMetadata(chainId);

  const {
    vaultQuery,
    vaultTokenQuery,
    migrationVaultTokenQuery,
    baseTokenQuery,
    quoteTokenQuery,
  } = useVaultModalQueries(vaultId);

  const { vaultTokenQuery: vaultStakeTokenQuery, rewardTrackerDataQuery } =
    useVaultStakeModalQueries(vaultId);

  const { tokenData } = useVaultModalTokenInputState();

  const tokenSymbol = tokenData?.symbol ?? "";
  const tokenAddress = tokenData?.address ?? "";

  const { data } = migrationVaultTokenQuery;

  const { address: vaultTokenAddress = "" } = data ?? {};

  const tokenApproveDependantQueries = [
    baseTokenQuery,
    quoteTokenQuery,
    vaultTokenQuery,
    migrationVaultTokenQuery,
  ];
  const vaultDependantQueries = [
    ...tokenApproveDependantQueries,
    vaultQuery,
    vaultStakeTokenQuery,
    rewardTrackerDataQuery,
  ];

  const onTransactionSuccess = () => {
    depositTokenInputState.resetState();
    withdrawTokenInputState.resetState();
  };

  const onApproveTransactionSuccess = (transactionHash: string) => {
    toast({
      type: ToastType.SUCCESS,
      title: `Approve ${tokenSymbol}`,
      chainId,
      transactionHash,
    });
  };

  const onDepositTransactionSuccess = (transactionHash: string) => {
    toast({
      type: ToastType.SUCCESS,
      title: `Deposit ${tokenSymbol}`,
      chainId,
      transactionHash,
    });

    onTransactionSuccess();
  };

  const onWithdrawTransactionSuccess = (transactionHash: string) => {
    toast({
      type: ToastType.SUCCESS,
      title: `Withdraw ${tokenSymbol}`,
      chainId,
      transactionHash,
    });

    onTransactionSuccess();
  };

  const onMigrationTransactionSuccess = (transactionHash: string) => {
    toast({
      type: ToastType.SUCCESS,
      title: `Migrate ${tokenSymbol}`,
      chainId,
      transactionHash,
    });

    onTransactionSuccess();
  };

  const onApproveTransactionError = (error: Error) => {
    toast({
      type: ToastType.ERROR,
      title: `Approve ${tokenSymbol}`,
      description: error.message,
    });
  };

  const onDepositTransactionError = (error: Error) => {
    toast({
      type: ToastType.ERROR,
      title: `Deposit ${tokenSymbol}`,
      description: error.message,
    });
  };

  const onWithdrawTransactionError = (error: Error) => {
    toast({
      type: ToastType.ERROR,
      title: `Withdraw ${tokenSymbol}`,
      description: error.message,
    });
  };

  const onMigrationTransactionError = (error: Error) => {
    toast({
      type: ToastType.ERROR,
      title: `Migrate ${tokenSymbol}`,
      description: error.message,
    });
  };

  const tokenApproveTransaction = useTokenApproveTransaction(
    tokenAddress,
    tokenApproveDependantQueries,
    onApproveTransactionSuccess,
    onApproveTransactionError
  );

  const vaultTokenApproveTransaction = useTokenApproveTransaction(
    vaultTokenAddress,
    tokenApproveDependantQueries,
    onApproveTransactionSuccess,
    onApproveTransactionError
  );

  const depositTransaction = useVaultDepositTransaction(
    vault,
    chainId,
    vaultDependantQueries,
    onDepositTransactionSuccess,
    onDepositTransactionError
  );

  const withdrawTransaction = useVaultWithdrawTransaction(
    vault,
    vaultDependantQueries,
    onWithdrawTransactionSuccess,
    onWithdrawTransactionError
  );

  const migrateTransaction = useVaultMigrationTransaction(
    vaultMigrationManager,
    vaultDependantQueries,
    onMigrationTransactionSuccess,
    onMigrationTransactionError
  );

  const value = useMemo(
    () => ({
      tokenApproveTransaction,
      vaultTokenApproveTransaction,
      depositTransaction,
      withdrawTransaction,
      migrateTransaction,
    }),
    [
      tokenApproveTransaction,
      vaultTokenApproveTransaction,
      depositTransaction,
      withdrawTransaction,
      migrateTransaction,
    ]
  );

  return (
    <VaultModalTransactionsContext.Provider value={value}>
      {children}
    </VaultModalTransactionsContext.Provider>
  );
};
