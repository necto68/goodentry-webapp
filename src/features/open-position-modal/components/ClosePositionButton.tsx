import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { TransactionErrorMainButton } from "../../form-components/components/TransactionErrorMainButton";
import { TabType } from "../../trade-panel/types/TabType";
import { useOpenPositionModalState } from "../stores/useOpenPositionModalState";
import { useOpenPositionModalTransactions } from "../stores/useOpenPositionModalTransactions";

export const ClosePositionButton = () => {
  const { selectedTab } = useOpenPositionModalState();

  const { closePositionTransaction } = useOpenPositionModalTransactions();

  const { mutation, resetTransaction, runTransaction } =
    closePositionTransaction;

  const isLongTab = selectedTab === TabType.LONG;

  const handleButtonClick = useCallback(() => {
    // TODO: v2 update
    runTransaction(0);
  }, [runTransaction]);

  const title = "Close Position";
  const loadingTitle = "Closing Position...";

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
