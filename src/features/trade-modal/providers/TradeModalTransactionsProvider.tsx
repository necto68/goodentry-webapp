import { createContext, useMemo } from "react";

import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { usePositionsQuery } from "../../queries/hooks/usePositionsQuery";
import { defaultUseMutationResult } from "../../shared/constants/defaultUseMutationResult";
import { delay } from "../../shared/helpers/utils";
import { useModal } from "../../shared/modal/hooks/useModal";
import { useToast } from "../../toast/hooks/useToast";
import { ToastType } from "../../toast/types/ToastType";
import { useClosePositionTransaction } from "../../transactions/transaction-hooks/useClosePositionTransaction";
import { useOpenPositionTransaction } from "../../transactions/transaction-hooks/useOpenPositionTransaction";
import { getChainMetadata } from "../../web3/helpers/getChainMetadata";
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

  const positionsQuery = usePositionsQuery();

  const { chainId } = getPairConfig(selectedPairId);

  const {
    addresses: { optionsPositionsManager },
  } = getChainMetadata(chainId);

  const positionsDependantQueries: DependantQueries = [];

  const onTransactionSuccess = async (transactionHash: string) => {
    await positionsQuery.refetch();
    await delay(2000);
    await positionsQuery.refetch();

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

  // TODO: v2 update
  const openPositionTransaction = useOpenPositionTransaction(
    "",
    positionsDependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const closePositionTransaction = useClosePositionTransaction(
    optionsPositionsManager,
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
