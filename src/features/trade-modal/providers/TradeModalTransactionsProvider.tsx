import { createContext, useMemo } from "react";

import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { usePairOpenInterestQuery } from "../../queries/hooks/usePairOpenInterestQuery";
import { usePairPricesQuery } from "../../queries/hooks/usePairPricesQuery";
import { usePositionsQuery } from "../../queries/hooks/usePositionsQuery";
import { defaultUseMutationResult } from "../../shared/constants/defaultUseMutationResult";
import { useModal } from "../../shared/modal/hooks/useModal";
import { useToast } from "../../toast/hooks/useToast";
import { ToastType } from "../../toast/types/ToastType";
import { useTradePanelQueries } from "../../trade-panel/hooks/useTradePanelQueries";
import { useTokenApproveTransaction } from "../../transactions/hooks/useTokenApproveTransaction";
import { useClosePositionTransaction } from "../../transactions/transaction-hooks/useClosePositionTransaction";
import { useOpenPositionTransaction } from "../../transactions/transaction-hooks/useOpenPositionTransaction";
import { useTradeModalTitle } from "../hooks/useTradeModalTitle";
import { useTradeModalState } from "../stores/useTradeModalState";

import type { DependantQueries } from "../../shared/types/BaseTransaction";
import type { TradeModalTransactions } from "../types/TradeModalTransactions";
import type { ReactNode, FC } from "react";

interface TradeModalTransactionsProviderProps {
  readonly children: ReactNode;
}

export const TradeModalTransactionsContext =
  createContext<TradeModalTransactions>({
    tokenApproveTransaction: defaultUseMutationResult,
    openPositionTransaction: defaultUseMutationResult,
    closePositionTransaction: defaultUseMutationResult,
  });

export const TradeModalTransactionsProvider: FC<
  TradeModalTransactionsProviderProps
> = ({ children }) => {
  const { popModal } = useModal();
  const toast = useToast();

  const { selectedPairId, quoteTokenInputState } = useTradeModalState();
  const title = useTradeModalTitle();

  const { quoteTokenQuery } = useTradePanelQueries(selectedPairId);
  const pairPricesQuery = usePairPricesQuery(selectedPairId);
  const pairOpenInterestQuery = usePairOpenInterestQuery(selectedPairId);
  const positionsQuery = usePositionsQuery();

  const { chainId } = getPairConfig(selectedPairId);

  const {
    addresses: { positionManager },
  } = getPairConfig(selectedPairId);

  const { tokenData } = quoteTokenInputState;
  const tokenSymbol = tokenData?.symbol ?? "";
  const tokenAddress = tokenData?.address ?? "";

  const tokenApproveDependantQueries: DependantQueries = [quoteTokenQuery];

  const positionsDependantQueries: DependantQueries = [
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

    quoteTokenInputState.resetState();
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
    positionsDependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const closePositionTransaction = useClosePositionTransaction(
    positionManager,
    positionsDependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const value = useMemo(
    () => ({
      tokenApproveTransaction,
      openPositionTransaction,
      closePositionTransaction,
    }),
    [tokenApproveTransaction, openPositionTransaction, closePositionTransaction]
  );

  return (
    <TradeModalTransactionsContext.Provider value={value}>
      {children}
    </TradeModalTransactionsContext.Provider>
  );
};
