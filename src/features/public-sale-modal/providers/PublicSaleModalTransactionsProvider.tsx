import { createContext, useMemo } from "react";

import { getPublicSaleConfig } from "../../public-sale-page/helpers/getPublicSaleConfig";
import { usePublicSaleQueries } from "../../public-sale-page/hooks/usePublicSaleQueries";
import { defaultUseMutationResult } from "../../shared/constants/defaultUseMutationResult";
import { useToast } from "../../toast/hooks/useToast";
import { ToastType } from "../../toast/types/ToastType";
import { useTokenApproveTransaction } from "../../transactions/hooks/useTokenApproveTransaction";
import { useCrowdSaleDepositTransaction } from "../../transactions/transaction-hooks/useCrowdSaleDepositTransaction";
import { useCollateralTokenInputState } from "../hooks/useCollateralTokenInputState";
import { usePublicSaleModalState } from "../stores/usePublicSaleModalState";

import type { PublicSaleModalTransactions } from "../types/PublicSaleModalTransactions";
import type { FC, ReactNode } from "react";

interface PublicSaleModalTransactionsProviderProps {
  readonly children: ReactNode;
}

export const PublicSaleModalTransactionsContext =
  createContext<PublicSaleModalTransactions>({
    tokenApproveTransaction: defaultUseMutationResult,
    depositTransaction: defaultUseMutationResult,
  });

export const PublicSaleModalTransactionsProvider: FC<
  PublicSaleModalTransactionsProviderProps
> = ({ children }) => {
  const toast = useToast();

  const { collateralTokenInputState, saleTokenInputState } =
    usePublicSaleModalState();

  const {
    chainId,
    addresses: { crowdSale },
  } = getPublicSaleConfig();

  const { collateralTokenQuery, saleTokenQuery, publicSaleDataQuery } =
    usePublicSaleQueries();

  const { tokenData } = useCollateralTokenInputState();

  const tokenSymbol = tokenData?.symbol ?? "";
  const tokenAddress = tokenData?.address ?? "";

  const tokenApproveDependantQueries = [collateralTokenQuery];
  const depositDependantQueries = [
    ...tokenApproveDependantQueries,
    saleTokenQuery,
    publicSaleDataQuery,
  ];

  const onTransactionSuccess = () => {
    collateralTokenInputState.resetState();
    saleTokenInputState.resetState();
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

  const tokenApproveTransaction = useTokenApproveTransaction(
    tokenAddress,
    tokenApproveDependantQueries,
    onApproveTransactionSuccess,
    onApproveTransactionError
  );

  const depositTransaction = useCrowdSaleDepositTransaction(
    crowdSale,
    depositDependantQueries,
    onDepositTransactionSuccess,
    onDepositTransactionError
  );

  const value = useMemo(
    () => ({
      tokenApproveTransaction,
      depositTransaction,
    }),
    [tokenApproveTransaction, depositTransaction]
  );

  return (
    <PublicSaleModalTransactionsContext.Provider value={value}>
      {children}
    </PublicSaleModalTransactionsContext.Provider>
  );
};
