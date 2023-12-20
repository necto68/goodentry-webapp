import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { TransactionErrorMainButton } from "../../form-components/components/TransactionErrorMainButton";
import { useIsGeWalletInfoLoadingStore } from "../../ge-wallet/stores/useIsGeWalletInfoLoadingStore";
import { TabType } from "../../trade-panel/types/TabType";
import { useTradeModalState } from "../stores/useTradeModalState";
import { useTradeModalTransactions } from "../stores/useTradeModalTransactions";

export const OpenPositionButton = () => {
  const { setIsGeWalletInfoLoading } = useIsGeWalletInfoLoadingStore();

  const { selectedTab } = useTradeModalState();
  const { openPositionTransaction } = useTradeModalTransactions();

  const { mutation, resetTransaction, runTransaction } =
    openPositionTransaction;

  const isLongTab = selectedTab === TabType.LONG;

  const handleButtonClick = useCallback(() => {
    // const amount = toTokenAmount(tickerAmount, tickerToken).toString();

    // TODO: v2 update
    runTransaction("", "", "");

    // hide wallet info while all queries
    // are refetching after transaction
    setIsGeWalletInfoLoading(true);
  }, [runTransaction, setIsGeWalletInfoLoading]);

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
