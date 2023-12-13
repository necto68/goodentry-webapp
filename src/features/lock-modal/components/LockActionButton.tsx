import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { TransactionErrorMainButton } from "../../form-components/components/TransactionErrorMainButton";
import { toTokenAmount } from "../../input-card/helpers/tokenAmount";
import { useLockQueries } from "../../lock-page/hooks/useLockQueries";
import { getZero } from "../../shared/helpers/bigjs";
import { useLockModalTokenInputState } from "../hooks/useLockModalTokenInputState";
import { useLockModalState } from "../stores/useLockModalState";
import { useLockModalTransactions } from "../stores/useLockModalTransactions";
import { TabType } from "../types/TabType";

export const LockActionButton = () => {
  const { selectedTab } = useLockModalState();
  const isLockTab = selectedTab === TabType.LOCK;

  const { lockTransaction, unlockTransaction } = useLockModalTransactions();

  const { lockTokenQuery, governanceTokenQuery, lockDataQuery } =
    useLockQueries();

  const { tokenData, inputValueBig } = useLockModalTokenInputState();

  const actionTransaction = isLockTab ? lockTransaction : unlockTransaction;

  const { mutation, resetTransaction, runTransaction } = actionTransaction;
  const dependantQueries = [
    lockTokenQuery,
    governanceTokenQuery,
    lockDataQuery,
  ];

  const [title, loadingTitle] =
    selectedTab === TabType.LOCK
      ? ["Lock", "Locking..."]
      : ["Unlock", "Unlocking..."];

  const handleButtonClick = useCallback(() => {
    if (tokenData) {
      const amount = toTokenAmount(inputValueBig, tokenData).toString();

      runTransaction(amount);
    }
  }, [tokenData, inputValueBig, runTransaction]);

  const { isError, isLoading } = mutation;
  const isDisabled =
    inputValueBig.lte(getZero()) ||
    dependantQueries.some((query) => query.isLoading);

  if (isError) {
    return <TransactionErrorMainButton resetTransaction={resetTransaction} />;
  }

  return (
    <Button
      isDisabled={isDisabled}
      isLoading={isLoading}
      loadingText={loadingTitle}
      onClick={handleButtonClick}
      variant="brand"
    >
      {title}
    </Button>
  );
};
