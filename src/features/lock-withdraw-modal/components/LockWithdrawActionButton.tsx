import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { TransactionErrorMainButton } from "../../form-components/components/TransactionErrorMainButton";
import { useLockQueries } from "../../lock-page/hooks/useLockQueries";
import { useLockWithdrawModalState } from "../stores/useLockWithdrawModalState";
import { useLockWithdrawModalTransactions } from "../stores/useLockWithdrawModalTransactions";

export const LockWithdrawActionButton = () => {
  const { selectedUnlockSchedule } = useLockWithdrawModalState();
  const { withdrawTransaction } = useLockWithdrawModalTransactions();

  const { lockTokenQuery, governanceTokenQuery, lockDataQuery } =
    useLockQueries();

  const { isPenaltyExist } = selectedUnlockSchedule ?? {};

  const { mutation, resetTransaction, runTransaction } = withdrawTransaction;
  const dependantQueries = [
    lockTokenQuery,
    governanceTokenQuery,
    lockDataQuery,
  ];

  const title = isPenaltyExist ? "Withdraw Early" : "Withdraw";
  const loadingTitle = "Withdrawing...";

  const buttonVariant = isPenaltyExist ? "error" : "brand";

  const handleButtonClick = useCallback(() => {
    if (selectedUnlockSchedule) {
      runTransaction(selectedUnlockSchedule.unlockScheduleIndex);
    }
  }, [runTransaction, selectedUnlockSchedule]);

  const { isError, isLoading } = mutation;
  const isDisabled = dependantQueries.some((query) => query.isLoading);

  if (isError) {
    return <TransactionErrorMainButton resetTransaction={resetTransaction} />;
  }

  return (
    <Button
      isDisabled={isDisabled}
      isLoading={isLoading}
      loadingText={loadingTitle}
      onClick={handleButtonClick}
      variant={buttonVariant}
    >
      {title}
    </Button>
  );
};
