import { createContext, useMemo } from "react";

import { usePairLendingPool } from "../../ge-wallet/hooks/usePairLendingPool";
import { useIsGeWalletInfoLoadingStore } from "../../ge-wallet/stores/useIsGeWalletInfoLoadingStore";
import { useLendingPoolModalQueries } from "../../lending-pool-modal/hooks/useLendingPoolModalQueries";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { useLendingPoolQuery } from "../../queries/hooks/useLendingPoolQuery";
import { usePositionsQuery } from "../../queries/hooks/usePositionsQuery";
import { useTickerQuery } from "../../queries/hooks/useTickerQuery";
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

  const { setIsGeWalletInfoLoading } = useIsGeWalletInfoLoadingStore();

  const { selectedPairId, selectedTickerAddress, tickerTokenInputState } =
    useTradeModalState();
  const title = useTradeModalTitle();
  const lendingPool = usePairLendingPool();

  const lendingPoolAddress = lendingPool?.address ?? "";

  const lendingPoolQuery = useLendingPoolQuery({
    pairId: selectedPairId,
    lendingPoolAddress,
  });

  const tickerQuery = useTickerQuery({
    pairId: selectedPairId,
    tickerAddress: selectedTickerAddress,
  });

  const { aToken0Query, aToken1Query } = useLendingPoolModalQueries(
    selectedPairId,
    lendingPoolAddress
  );

  const positionsQuery = usePositionsQuery();

  const { chainId } = getPairConfig(selectedPairId);

  const {
    addresses: { optionsPositionsManager },
  } = getChainMetadata(chainId);

  const positionsDependantQueries = [
    lendingPoolQuery,
    tickerQuery,
    aToken0Query,
    aToken1Query,
  ];

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

    tickerTokenInputState.resetState();
    popModal();

    // show wallet info after
    // all queries are refetched
    setIsGeWalletInfoLoading(false);
  };

  const onTransactionError = (error: Error) => {
    toast({
      type: ToastType.ERROR,
      title,
      description: error.message,
    });

    // show wallet info after
    // transaction failed
    setIsGeWalletInfoLoading(false);
  };

  const openPositionTransaction = useOpenPositionTransaction(
    lendingPoolAddress,
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
