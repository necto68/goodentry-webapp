import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { TransactionErrorMainButton } from "../../form-components/components/TransactionErrorMainButton";
import { isPositionSideLong } from "../../trade-panel/helpers/isPositionSideLong";
import { useClosePositionModalState } from "../stores/useClosePositionModalState";
import { useClosePositionModalTransactions } from "../stores/useClosePositionModalTransactions";

export const ClosePositionButton = () => {
  const { id, positionSide } = useClosePositionModalState();

  const { closePositionTransaction } = useClosePositionModalTransactions();

  const { mutation, resetTransaction, runTransaction } =
    closePositionTransaction;

  const isLong = isPositionSideLong(positionSide);

  const handleButtonClick = useCallback(() => {
    runTransaction(id);
  }, [runTransaction, id]);

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
