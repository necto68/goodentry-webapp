import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { TransactionErrorMainButton } from "../../form-components/components/TransactionErrorMainButton";
import { useIsGeWalletInfoLoadingStore } from "../../ge-wallet/stores/useIsGeWalletInfoLoadingStore";
import { toTokenAmount } from "../../input-card/helpers/tokenAmount";
import { useTicker } from "../../trade-panel/hooks/useTicker";
import { TabType } from "../../trade-panel/types/TabType";
import { useSwapSourceAddress } from "../hooks/useSwapSourceAddress";
import { useTradeModalState } from "../stores/useTradeModalState";
import { useTradeModalTransactions } from "../stores/useTradeModalTransactions";

export const OpenPositionButton = () => {
  const { setIsGeWalletInfoLoading } = useIsGeWalletInfoLoadingStore();

  const {
    selectedTab,
    selectedPairId,
    selectedTickerAddress,
    tickerTokenInputState,
  } = useTradeModalState();
  const ticker = useTicker(selectedPairId, selectedTickerAddress);
  const { openPositionTransaction } = useTradeModalTransactions();
  const swapSourceAddress = useSwapSourceAddress();

  const { inputValueBig } = tickerTokenInputState;
  const { mutation, resetTransaction, runTransaction } =
    openPositionTransaction;

  const isLongTab = selectedTab === TabType.LONG;
  const { tickerToken } = ticker ?? {};
  const { price: tickerPrice = 0 } = tickerToken ?? {};

  const tickerAmount =
    tickerPrice > 0 ? inputValueBig.div(tickerPrice) : inputValueBig;

  const handleButtonClick = useCallback(() => {
    if (tickerToken && selectedTickerAddress) {
      const amount = toTokenAmount(tickerAmount, tickerToken).toString();

      runTransaction(swapSourceAddress, selectedTickerAddress, amount);

      // hide wallet info while all queries
      // are refetching after transaction
      setIsGeWalletInfoLoading(true);
    }
  }, [
    tickerToken,
    selectedTickerAddress,
    tickerAmount,
    runTransaction,
    swapSourceAddress,
    setIsGeWalletInfoLoading,
  ]);

  const title = "Open Position";
  const loadingTitle = "Opening Position...";

  const { isError, isLoading } = mutation;

  if (isError) {
    return <TransactionErrorMainButton resetTransaction={resetTransaction} />;
  }

  return (
    <Button
      isLoading={isLoading}
      loadingText={loadingTitle}
      onClick={handleButtonClick}
      variant={isLongTab ? "brand" : "error"}
    >
      {title}
    </Button>
  );
};
