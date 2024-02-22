import { createContext, useMemo } from "react";

import { useReferralsQuery } from "../../queries/hooks/useReferralsQuery";
import { defaultUseMutationResult } from "../../shared/constants/defaultUseMutationResult";
import { useToast } from "../../toast/hooks/useToast";
import { ToastType } from "../../toast/types/ToastType";
import { useSetMyReferralCodeTransaction } from "../../transactions/transaction-hooks/useSetMyReferralCodeTransaction";
import { useSetReferrerTransaction } from "../../transactions/transaction-hooks/useSetReferrerTransaction";
import { useWallet } from "../../wallet/hooks/useWallet";
import { ChainId } from "../../web3/types/ChainId";
import { useReferralModalState } from "../stores/useReferralModalState";

import type { ReferralModalTransactions } from "../types/ReferralModalTransactions";
import type { FC, ReactNode } from "react";

interface VaultModalTransactionsProviderProps {
  readonly children: ReactNode;
}

export const ReferralModalTransactionsContext =
  createContext<ReferralModalTransactions>({
    setReferrer: defaultUseMutationResult,
    setMyRefCode: defaultUseMutationResult,
  });

export const ReferralModalTransactionsProvider: FC<
  VaultModalTransactionsProviderProps
> = ({ children }) => {
  const toast = useToast();

  const { chainId = ChainId.ARBITRUM } = useWallet();

  const modalState = useReferralModalState();

  const { refetch } = useReferralsQuery();

  const { referralCodeInputState, myReferralCodeInputState } = modalState;

  const onTransactionSuccess = () => {
    void refetch();
  };

  const setReferrerSuccess = (transactionHash: string) => {
    toast({
      type: ToastType.SUCCESS,
      title: "Referrer successfully added",
      chainId,
      transactionHash,
    });

    onTransactionSuccess();
  };

  const setMyReferralCodeSuccess = (transactionHash: string) => {
    toast({
      type: ToastType.SUCCESS,
      title: "Your code successfully added",
      chainId,
      transactionHash,
    });

    onTransactionSuccess();
  };

  const setError = (error: Error) => {
    toast({
      type: ToastType.ERROR,
      title: "Error",
      description: error.message,
    });
  };

  const setReferrerTransaction = useSetReferrerTransaction(
    referralCodeInputState,
    chainId,
    [],
    setReferrerSuccess,
    setError
  );

  const setMyReferralCodeTransaction = useSetMyReferralCodeTransaction(
    myReferralCodeInputState,
    chainId,
    [],
    setMyReferralCodeSuccess,
    setError
  );

  const value = useMemo(
    () => ({
      setReferrer: setReferrerTransaction,
      setMyRefCode: setMyReferralCodeTransaction,
    }),
    [setReferrerTransaction, setMyReferralCodeTransaction]
  );

  return (
    <ReferralModalTransactionsContext.Provider value={value}>
      {children}
    </ReferralModalTransactionsContext.Provider>
  );
};
