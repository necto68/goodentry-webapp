import { createContext, useMemo } from "react";

import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { usePairOpenInterestQuery } from "../../queries/hooks/usePairOpenInterestQuery";
import { usePairPricesQuery } from "../../queries/hooks/usePairPricesQuery";
import { usePositionsQuery } from "../../queries/hooks/usePositionsQuery";
import { defaultUseMutationResult } from "../../shared/constants/defaultUseMutationResult";
import { useModal } from "../../shared/modal/hooks/useModal";
import { useToast } from "../../toast/hooks/useToast";
import { ToastType } from "../../toast/types/ToastType";
import { useTradeModalTitle } from "../../trade-panel/hooks/useTradeModalTitle";
import { useTradePanelQueries } from "../../trade-panel/hooks/useTradePanelQueries";
import { PositionAction } from "../../trade-panel/types/PositionAction";
import { useTokenApproveTransaction } from "../../transactions/hooks/useTokenApproveTransaction";
import { useOpenPositionTransaction } from "../../transactions/transaction-hooks/useOpenPositionTransaction";
import { useOpenPositionModalState } from "../stores/useOpenPositionModalState";

import type { DependantQueries } from "../../shared/types/BaseTransaction";
import type { OpenPositionModalTransactions } from "../types/OpenPositionModalTransactions";
import type { FC, ReactNode } from "react";

interface OpenPositionModalTransactionsProviderProps {
  readonly children: ReactNode;
}

export const OpenPositionModalTransactionsContext =
  createContext<OpenPositionModalTransactions>({
    tokenApproveTransaction: defaultUseMutationResult,
    openPositionTransaction: defaultUseMutationResult,
  });

export const OpenPositionModalTransactionsProvider: FC<
  OpenPositionModalTransactionsProviderProps
> = ({ children }) => {
  const { popModal } = useModal();
  const toast = useToast();

  const { positionSide, pairId, quoteTokenInputState } =
    useOpenPositionModalState();
  const title = useTradeModalTitle(PositionAction.OPEN, positionSide, pairId);

  const { quoteTokenQuery } = useTradePanelQueries(pairId);
  const pairPricesQuery = usePairPricesQuery(pairId);
  const pairOpenInterestQuery = usePairOpenInterestQuery(pairId);
  const positionsQuery = usePositionsQuery();

  const { chainId } = getPairConfig(pairId);

  const {
    addresses: { positionManager },
  } = getPairConfig(pairId);

  const { tokenData } = quoteTokenInputState;
  const tokenSymbol = tokenData?.symbol ?? "";
  const tokenAddress = tokenData?.address ?? "";

  const tokenApproveDependantQueries: DependantQueries = [quoteTokenQuery];

  const openPositionDependantQueries: DependantQueries = [
    ...tokenApproveDependantQueries,
    pairPricesQuery,
    pairOpenInterestQuery,
    positionsQuery,
  ];

  const onApproveTransactionSuccess = (transactionHash: string) => {
    toast({
      type: ToastType.SUCCESS,
      title: `Approve ${tokenSymbol}`,
      chainId,
      transactionHash,
    });
  };

  const onTransactionSuccess = (transactionHash: string) => {
    toast({
      type: ToastType.SUCCESS,
      title,
      chainId,
      transactionHash,
    });

    popModal();
  };

  const onApproveTransactionError = (error: Error) => {
    toast({
      type: ToastType.ERROR,
      title: `Approve ${tokenSymbol}`,
      description: error.message,
    });
  };

  const onTransactionError = (error: Error) => {
    toast({
      type: ToastType.ERROR,
      title,
      description: error.message,
    });
  };

  const tokenApproveTransaction = useTokenApproveTransaction(
    tokenAddress,
    tokenApproveDependantQueries,
    onApproveTransactionSuccess,
    onApproveTransactionError
  );

  const openPositionTransaction = useOpenPositionTransaction(
    positionManager,
    openPositionDependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const value = useMemo(
    () => ({
      tokenApproveTransaction,
      openPositionTransaction,
    }),
    [tokenApproveTransaction, openPositionTransaction]
  );

  return (
    <OpenPositionModalTransactionsContext.Provider value={value}>
      {children}
    </OpenPositionModalTransactionsContext.Provider>
  );
};
