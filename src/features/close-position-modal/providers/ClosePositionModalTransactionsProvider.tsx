import { createContext, useMemo } from "react";

import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { usePairOpenInterestQuery } from "../../queries/hooks/usePairOpenInterestQuery";
import { usePairPricesQuery } from "../../queries/hooks/usePairPricesQuery";
import { usePositionsQuery } from "../../queries/hooks/usePositionsQuery";
import { PositionSide } from "../../queries/types/Position";
import { defaultUseMutationResult } from "../../shared/constants/defaultUseMutationResult";
import { useModal } from "../../shared/modal/hooks/useModal";
import { useToast } from "../../toast/hooks/useToast";
import { ToastType } from "../../toast/types/ToastType";
import { useTradeModalTitle } from "../../trade-panel/hooks/useTradeModalTitle";
import { PositionActionType } from "../../trade-panel/types/PositionActionType";
import { TabType } from "../../trade-panel/types/TabType";
import { useClosePositionTransaction } from "../../transactions/transaction-hooks/useClosePositionTransaction";
import { useClosePositionModalState } from "../stores/useClosePositionModalState";

import type { DependantQueries } from "../../shared/types/BaseTransaction";
import type { ClosePositionModalTransactions } from "../types/ClosePositionModalTransactions";
import type { FC, ReactNode } from "react";

interface ClosePositionModalTransactionsProviderProps {
  readonly children: ReactNode;
}

export const ClosePositionModalTransactionsContext =
  createContext<ClosePositionModalTransactions>({
    closePositionTransaction: defaultUseMutationResult,
  });

export const ClosePositionModalTransactionsProvider: FC<
  ClosePositionModalTransactionsProviderProps
> = ({ children }) => {
  const { popModal } = useModal();
  const toast = useToast();

  const { pairId, side } = useClosePositionModalState();
  const title = useTradeModalTitle(
    PositionActionType.OPEN,
    side === PositionSide.LONG ? TabType.LONG : TabType.SHORT,
    pairId
  );

  const pairPricesQuery = usePairPricesQuery(pairId);
  const pairOpenInterestQuery = usePairOpenInterestQuery(pairId);
  const positionsQuery = usePositionsQuery();

  const { chainId } = getPairConfig(pairId);

  const {
    addresses: { positionManager },
  } = getPairConfig(pairId);

  const dependantQueries: DependantQueries = [
    pairPricesQuery,
    pairOpenInterestQuery,
    positionsQuery,
  ];

  const onTransactionSuccess = (transactionHash: string) => {
    toast({
      type: ToastType.SUCCESS,
      title,
      chainId,
      transactionHash,
    });

    popModal();
  };

  const onTransactionError = (error: Error) => {
    toast({
      type: ToastType.ERROR,
      title,
      description: error.message,
    });
  };

  const closePositionTransaction = useClosePositionTransaction(
    positionManager,
    dependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const value = useMemo(
    () => ({
      closePositionTransaction,
    }),
    [closePositionTransaction]
  );

  return (
    <ClosePositionModalTransactionsContext.Provider value={value}>
      {children}
    </ClosePositionModalTransactionsContext.Provider>
  );
};
