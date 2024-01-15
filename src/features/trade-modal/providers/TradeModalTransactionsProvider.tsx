import { createContext, useMemo } from "react";

import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { usePositionsQuery } from "../../queries/hooks/usePositionsQuery";
import { defaultUseMutationResult } from "../../shared/constants/defaultUseMutationResult";
import { useModal } from "../../shared/modal/hooks/useModal";
import { useToast } from "../../toast/hooks/useToast";
import { ToastType } from "../../toast/types/ToastType";
import { useTradePanelQueries } from "../../trade-panel/hooks/useTradePanelQueries";
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
  const positionsQuery = usePositionsQuery();

  const { chainId } = getPairConfig(selectedPairId);

  const {
    addresses: { positionManager },
  } = getPairConfig(selectedPairId);

  const positionsDependantQueries: DependantQueries = [
    quoteTokenQuery,
    positionsQuery,
  ];

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

  const onTransactionError = (error: Error) => {
    toast({
      type: ToastType.ERROR,
      title,
      description: error.message,
    });
  };

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
      openPositionTransaction,
      closePositionTransaction,
    }),
    [openPositionTransaction, closePositionTransaction]
  );

  return (
    <TradeModalTransactionsContext.Provider value={value}>
      {children}
    </TradeModalTransactionsContext.Provider>
  );
};
