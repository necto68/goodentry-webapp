import { createContext, useMemo } from "react";

import { getLockConfig } from "../../lock-page/helpers/getLockConfig";
import { useLockQueries } from "../../lock-page/hooks/useLockQueries";
import { defaultUseMutationResult } from "../../shared/constants/defaultUseMutationResult";
import { useModal } from "../../shared/modal/hooks/useModal";
import { useToast } from "../../toast/hooks/useToast";
import { ToastType } from "../../toast/types/ToastType";
import { useGovernanceTokenWithdrawTransaction } from "../../transactions/transaction-hooks/useGovernanceTokenWithdrawTransaction";

import type { LockWithdrawModalTransactions } from "../types/LockWithdrawModalTransactions";
import type { FC, ReactNode } from "react";

interface LockWithdrawModalTransactionsProviderProps {
  readonly children: ReactNode;
}

export const LockWithdrawModalTransactionsContext =
  createContext<LockWithdrawModalTransactions>({
    withdrawTransaction: defaultUseMutationResult,
  });

export const LockWithdrawModalTransactionsProvider: FC<
  LockWithdrawModalTransactionsProviderProps
> = ({ children }) => {
  const { popModal } = useModal();
  const toast = useToast();

  const {
    chainId,
    addresses: { governanceToken },
  } = getLockConfig();

  const { lockTokenQuery, governanceTokenQuery, lockDataQuery } =
    useLockQueries();

  const lockTokenData = lockTokenQuery.data;
  const tokenSymbol = lockTokenData?.symbol ?? "";

  const dependantQueries = [
    lockTokenQuery,
    governanceTokenQuery,
    lockDataQuery,
  ];

  const onTransactionSuccess = () => {
    popModal();
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

  const onWithdrawTransactionError = (error: Error) => {
    toast({
      type: ToastType.ERROR,
      title: `Withdraw ${tokenSymbol}`,
      description: error.message,
    });
  };

  const withdrawTransaction = useGovernanceTokenWithdrawTransaction(
    governanceToken,
    dependantQueries,
    onWithdrawTransactionSuccess,
    onWithdrawTransactionError
  );

  const value = useMemo(
    () => ({
      withdrawTransaction,
    }),
    [withdrawTransaction]
  );

  return (
    <LockWithdrawModalTransactionsContext.Provider value={value}>
      {children}
    </LockWithdrawModalTransactionsContext.Provider>
  );
};
