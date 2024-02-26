import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { SuccessfulMainButton } from "../../form-components/components/SuccessfulMainButton";
import { TransactionErrorMainButton } from "../../form-components/components/TransactionErrorMainButton";
import { useVaultStakeModalQueries } from "../hooks/useVaultStakeModalQueries";
import { useVaultStakeModalState } from "../stores/useVaultStakeModalState";
import { useVaultStakeModalTransactions } from "../stores/useVaultStakeModalTransactions";

export const ClaimActionButton = () => {
  const { vaultId } = useVaultStakeModalState();
  const { claimTransaction } = useVaultStakeModalTransactions();

  const { rewardTrackerDataQuery, rewardTokenQuery } =
    useVaultStakeModalQueries(vaultId);

  const { mutation, resetTransaction, runTransaction } = claimTransaction;
  const dependantQueries = [rewardTrackerDataQuery];

  const rewardTrackerData = rewardTrackerDataQuery.data;
  const { claimableBalance } = rewardTrackerData ?? {};
  const rewardTokenSymbol = rewardTokenQuery.data?.symbol ?? "";

  const [title, loadingTitle] = [`Claim ${rewardTokenSymbol}`, "Claiming..."];

  const handleButtonClick = useCallback(() => {
    runTransaction();
  }, [runTransaction]);

  const { isSuccess, isError, isLoading } = mutation;
  const isDisabled =
    Boolean(claimableBalance?.lte(0)) ||
    dependantQueries.some((query) => query.isLoading);

  if (isSuccess) {
    return <SuccessfulMainButton title="Claim Successful" />;
  }

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
