import { createContext, useMemo } from "react";

import { useLendingPool } from "../../ge-wallet/hooks/useLendingPool";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { defaultUseMutationResult } from "../../shared/constants/defaultUseMutationResult";
import { useToast } from "../../toast/hooks/useToast";
import { ToastType } from "../../toast/types/ToastType";
import { useTokenApproveTransaction } from "../../transactions/hooks/useTokenApproveTransaction";
import { useLendingPoolDepositTransaction } from "../../transactions/transaction-hooks/useLendingPoolDepositTransaction";
import { useLendingPoolWithdrawTransaction } from "../../transactions/transaction-hooks/useLendingPoolWithdrawTransaction";
import { useLendingPoolModalQueries } from "../hooks/useLendingPoolModalQueries";
import { useLendingPoolModalTokenInputState } from "../hooks/useLendingPoolModalTokenInputState";
import { useLendingPoolModalState } from "../stores/useLendingPoolModalState";

import type { LendingPoolModalTransactions } from "../types/LendingPoolModalTransactions";
import type { FC, ReactNode } from "react";

interface LendingPoolModalTransactionsProviderProps {
  readonly children: ReactNode;
}

export const LendingPoolModalTransactionsContext =
  createContext<LendingPoolModalTransactions>({
    tokenApproveTransaction: defaultUseMutationResult,
    depositTransaction: defaultUseMutationResult,
    withdrawTransaction: defaultUseMutationResult,
  });

export const LendingPoolModalTransactionsProvider: FC<
  LendingPoolModalTransactionsProviderProps
> = ({ children }) => {
  const toast = useToast();

  const {
    pairId,
    lendingPoolAddress,
    depositTokenInputState,
    withdrawTokenInputState,
  } = useLendingPoolModalState();

  const { chainId } = getPairConfig(pairId);

  const {
    lendingPoolQuery,
    token0Query,
    token1Query,
    aToken0Query,
    aToken1Query,
  } = useLendingPoolModalQueries(pairId, lendingPoolAddress);

  const { tokenData } = useLendingPoolModalTokenInputState();
  const lendingPool = useLendingPool(pairId, lendingPoolAddress);

  const tokenSymbol = tokenData?.symbol ?? "";
  const tokenAddress = tokenData?.address ?? "";
  const lendingPoolGatewayAddress = lendingPool?.gatewayAddress ?? "";

  const tokenApproveDependantQueries = [token0Query, token1Query];
  const lendingPoolDependantQueries = [
    ...tokenApproveDependantQueries,
    aToken0Query,
    aToken1Query,
    lendingPoolQuery,
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

  const tokenApproveTransaction = useTokenApproveTransaction(
    tokenAddress,
    tokenApproveDependantQueries,
    onApproveTransactionSuccess,
    onApproveTransactionError
  );

  const depositTransaction = useLendingPoolDepositTransaction(
    lendingPoolAddress,
    lendingPoolGatewayAddress,
    lendingPoolDependantQueries,
    onDepositTransactionSuccess,
    onDepositTransactionError
  );

  const withdrawTransaction = useLendingPoolWithdrawTransaction(
    lendingPoolAddress,
    lendingPoolGatewayAddress,
    chainId,
    lendingPoolDependantQueries,
    onWithdrawTransactionSuccess,
    onWithdrawTransactionError
  );

  const value = useMemo(
    () => ({
      tokenApproveTransaction,
      depositTransaction,
      withdrawTransaction,
    }),
    [tokenApproveTransaction, depositTransaction, withdrawTransaction]
  );

  return (
    <LendingPoolModalTransactionsContext.Provider value={value}>
      {children}
    </LendingPoolModalTransactionsContext.Provider>
  );
};
