import { createContext, useMemo } from "react";

import { defaultUseMutationResult } from "../../shared/constants/defaultUseMutationResult";
import { useToast } from "../../toast/hooks/useToast";
import { ToastType } from "../../toast/types/ToastType";
import { useTokenApproveTransaction } from "../../transactions/hooks/useTokenApproveTransaction";
import { useRewardTrackerStakeTransaction } from "../../transactions/transaction-hooks/useRewardTrackerStakeTransaction";
import { useRewardTrackerUnstakeTransaction } from "../../transactions/transaction-hooks/useRewardTrackerUnstakeTransaction";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { useVaultStakeModalQueries } from "../hooks/useVaultStakeModalQueries";
import { useVaultStakeModalState } from "../stores/useVaultStakeModalState";

import type { VaultStakeModalTransactions } from "../types/VaultStakeModalTransactions";
import type { FC, ReactNode } from "react";

interface VaultModalTransactionsProviderProps {
  readonly children: ReactNode;
}

export const VaultStakeModalTransactionsContext =
  createContext<VaultStakeModalTransactions>({
    tokenApproveTransaction: defaultUseMutationResult,
    stakeTransaction: defaultUseMutationResult,
    unstakeTransaction: defaultUseMutationResult,
  });

export const VaultStakeModalTransactionsProvider: FC<
  VaultModalTransactionsProviderProps
> = ({ children }) => {
  const toast = useToast();

  const { vaultId } = useVaultStakeModalState();

  const {
    chainId,
    addresses: { rewardTracker = "" },
  } = getVaultConfig(vaultId);

  const { vaultTokenQuery } = useVaultStakeModalQueries(vaultId);

  const vaultTokenData = vaultTokenQuery.data;
  const tokenSymbol = vaultTokenData?.symbol ?? "";
  const tokenAddress = vaultTokenData?.address ?? "";

  const tokenApproveDependantQueries = [vaultTokenQuery];

  // TODO: add reward tracker query later
  const rewardTrackerDependantQueries = Array.from(
    tokenApproveDependantQueries
  );

  const onApproveTransactionSuccess = (transactionHash: string) => {
    toast({
      type: ToastType.SUCCESS,
      title: `Approve ${tokenSymbol}`,
      chainId,
      transactionHash,
    });
  };

  const onStakeTransactionSuccess = (transactionHash: string) => {
    toast({
      type: ToastType.SUCCESS,
      title: `Stake ${tokenSymbol}`,
      chainId,
      transactionHash,
    });
  };

  const onUnstakeTransactionSuccess = (transactionHash: string) => {
    toast({
      type: ToastType.SUCCESS,
      title: `Unstake ${tokenSymbol}`,
      chainId,
      transactionHash,
    });
  };

  const onApproveTransactionError = (error: Error) => {
    toast({
      type: ToastType.ERROR,
      title: `Approve ${tokenSymbol}`,
      description: error.message,
    });
  };

  const onStakeTransactionError = (error: Error) => {
    toast({
      type: ToastType.ERROR,
      title: `Stake ${tokenSymbol}`,
      description: error.message,
    });
  };

  const onUnstakeTransactionError = (error: Error) => {
    toast({
      type: ToastType.ERROR,
      title: `Unstake ${tokenSymbol}`,
      description: error.message,
    });
  };

  const tokenApproveTransaction = useTokenApproveTransaction(
    tokenAddress,
    tokenApproveDependantQueries,
    onApproveTransactionSuccess,
    onApproveTransactionError
  );

  const stakeTransaction = useRewardTrackerStakeTransaction(
    rewardTracker,
    rewardTrackerDependantQueries,
    onStakeTransactionSuccess,
    onStakeTransactionError
  );

  const unstakeTransaction = useRewardTrackerUnstakeTransaction(
    rewardTracker,
    rewardTrackerDependantQueries,
    onUnstakeTransactionSuccess,
    onUnstakeTransactionError
  );

  const value = useMemo(
    () => ({
      tokenApproveTransaction,
      stakeTransaction,
      unstakeTransaction,
    }),
    [tokenApproveTransaction, stakeTransaction, unstakeTransaction]
  );

  return (
    <VaultStakeModalTransactionsContext.Provider value={value}>
      {children}
    </VaultStakeModalTransactionsContext.Provider>
  );
};
