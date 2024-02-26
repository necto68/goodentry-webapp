import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { SuccessfulMainButton } from "../../form-components/components/SuccessfulMainButton";
import { TransactionErrorMainButton } from "../../form-components/components/TransactionErrorMainButton";
import { toTokenAmount } from "../../input-card/helpers/tokenAmount";
import { getZero } from "../../shared/helpers/bigjs";
import { useVaultStakeModalQueries } from "../hooks/useVaultStakeModalQueries";
import { useVaultStakeModalState } from "../stores/useVaultStakeModalState";
import { useVaultStakeModalTransactions } from "../stores/useVaultStakeModalTransactions";
import { TabType } from "../types/TabType";

export const StakeActionButton = () => {
  const { selectedTab, vaultId } = useVaultStakeModalState();
  const isStakeTab = selectedTab === TabType.STAKE;

  const { stakeTransaction, unstakeTransaction } =
    useVaultStakeModalTransactions();

  const { vaultTokenQuery, rewardTrackerDataQuery } =
    useVaultStakeModalQueries(vaultId);

  const vaultTokenData = vaultTokenQuery.data;
  const rewardTrackerData = rewardTrackerDataQuery.data;

  const vaultTokenBalance = vaultTokenData?.balance;
  const stakedBalance = rewardTrackerData?.stakedBalance;

  const transaction = isStakeTab ? stakeTransaction : unstakeTransaction;
  const balance = isStakeTab ? vaultTokenBalance : stakedBalance;

  const { mutation, resetTransaction, runTransaction } = transaction;
  const dependantQueries = [vaultTokenQuery, rewardTrackerDataQuery];

  const [title, loadingTitle] = isStakeTab
    ? ["Stake", "Staking..."]
    : ["Unstake", "Unstaking..."];

  const handleButtonClick = useCallback(() => {
    if (balance && vaultTokenData) {
      const amount = toTokenAmount(balance, vaultTokenData).toString();

      runTransaction(amount);
    }
  }, [balance, vaultTokenData, runTransaction]);

  const { isSuccess, isError, isLoading } = mutation;
  const isDisabled =
    Boolean(balance?.lte(getZero())) ||
    dependantQueries.some((query) => query.isLoading);

  if (isSuccess) {
    const successTitle = isStakeTab ? "Stake Successful" : "Unstake Successful";

    return <SuccessfulMainButton title={successTitle} />;
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
