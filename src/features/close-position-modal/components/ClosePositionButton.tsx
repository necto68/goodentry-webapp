import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { TransactionErrorMainButton } from "../../form-components/components/TransactionErrorMainButton";
import { PositionSide } from "../../queries/types/Position";
import { useClosePositionModalState } from "../stores/useClosePositionModalState";
import { useClosePositionModalTransactions } from "../stores/useClosePositionModalTransactions";

export const ClosePositionButton = () => {
  const { side } = useClosePositionModalState();

  const { closePositionTransaction } = useClosePositionModalTransactions();

  const { mutation, resetTransaction, runTransaction } =
    closePositionTransaction;

  const isLong = side === PositionSide.LONG;

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
      variant={isLong ? "brand" : "error"}
    >
      {title}
    </Button>
  );
};
