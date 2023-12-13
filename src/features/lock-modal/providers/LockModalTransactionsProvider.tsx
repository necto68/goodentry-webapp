import { createContext, useMemo } from "react";

import { getLockConfig } from "../../lock-page/helpers/getLockConfig";
import { useLockQueries } from "../../lock-page/hooks/useLockQueries";
import { defaultUseMutationResult } from "../../shared/constants/defaultUseMutationResult";
import { useToast } from "../../toast/hooks/useToast";
import { ToastType } from "../../toast/types/ToastType";
import { useGovernanceTokenLockTransaction } from "../../transactions/transaction-hooks/useGovernanceTokenLockTransaction";
import { useGovernanceTokenUnlockTransaction } from "../../transactions/transaction-hooks/useGovernanceTokenUnlockTransaction";
import { useLockModalTokenInputState } from "../hooks/useLockModalTokenInputState";
import { useLockModalState } from "../stores/useLockModalState";

import type { LockModalTransactions } from "../types/LockModalTransactions";
import type { FC, ReactNode } from "react";

interface LockModalTransactionsProviderProps {
  readonly children: ReactNode;
}

export const LockModalTransactionsContext =
  createContext<LockModalTransactions>({
    lockTransaction: defaultUseMutationResult,
    unlockTransaction: defaultUseMutationResult,
  });

export const LockModalTransactionsProvider: FC<
  LockModalTransactionsProviderProps
> = ({ children }) => {
  const toast = useToast();

  const {
    chainId,
    addresses: { governanceToken },
  } = getLockConfig();

  const { lockTokenInputState, unlockTokenInputState } = useLockModalState();
  const { lockTokenQuery, governanceTokenQuery, lockDataQuery } =
    useLockQueries();

  const { tokenData } = useLockModalTokenInputState();

  const tokenSymbol = tokenData?.symbol ?? "";

  const dependantQueries = [
    lockTokenQuery,
    governanceTokenQuery,
    lockDataQuery,
  ];

  const onTransactionSuccess = () => {
    lockTokenInputState.resetState();
    unlockTokenInputState.resetState();
  };

  const onLockTransactionSuccess = (transactionHash: string) => {
    toast({
      type: ToastType.SUCCESS,
      title: `Lock ${tokenSymbol}`,
      chainId,
      transactionHash,
    });

    onTransactionSuccess();
  };

  const onUnlockTransactionSuccess = (transactionHash: string) => {
    toast({
      type: ToastType.SUCCESS,
      title: `Unlock ${tokenSymbol}`,
      chainId,
      transactionHash,
    });

    onTransactionSuccess();
  };

  const onLockTransactionError = (error: Error) => {
    toast({
      type: ToastType.ERROR,
      title: `Lock ${tokenSymbol}`,
      description: error.message,
    });
  };

  const onUnlockTransactionError = (error: Error) => {
    toast({
      type: ToastType.ERROR,
      title: `Unlock ${tokenSymbol}`,
      description: error.message,
    });
  };

  const lockTransaction = useGovernanceTokenLockTransaction(
    governanceToken,
    dependantQueries,
    onLockTransactionSuccess,
    onLockTransactionError
  );

  const unlockTransaction = useGovernanceTokenUnlockTransaction(
    governanceToken,
    dependantQueries,
    onUnlockTransactionSuccess,
    onUnlockTransactionError
  );

  const value = useMemo(
    () => ({
      lockTransaction,
      unlockTransaction,
    }),
    [lockTransaction, unlockTransaction]
  );

  return (
    <LockModalTransactionsContext.Provider value={value}>
      {children}
    </LockModalTransactionsContext.Provider>
  );
};
