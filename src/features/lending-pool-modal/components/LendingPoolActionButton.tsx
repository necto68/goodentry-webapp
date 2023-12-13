import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { TransactionErrorMainButton } from "../../form-components/components/TransactionErrorMainButton";
import { toTokenAmount } from "../../input-card/helpers/tokenAmount";
import { getZero } from "../../shared/helpers/bigjs";
import { useLendingPoolModalQueries } from "../hooks/useLendingPoolModalQueries";
import { useLendingPoolModalTokenInputState } from "../hooks/useLendingPoolModalTokenInputState";
import { useLendingPoolModalState } from "../stores/useLendingPoolModalState";
import { useLendingPoolModalTransactions } from "../stores/useLendingPoolModalTransactions";
import { TabType } from "../types/TabType";

export const LendingPoolActionButton = () => {
  const { selectedTab, pairId, lendingPoolAddress } =
    useLendingPoolModalState();
  const isDepositTab = selectedTab === TabType.DEPOSIT;

  const { depositTransaction, withdrawTransaction } =
    useLendingPoolModalTransactions();

  const {
    lendingPoolQuery,
    nativeCoinQuery,
    token0Query,
    token1Query,
    aToken0Query,
    aToken1Query,
  } = useLendingPoolModalQueries(pairId, lendingPoolAddress);

  const { tokenData, inputValueBig } = useLendingPoolModalTokenInputState();

  const lendingPoolTransaction = isDepositTab
    ? depositTransaction
    : withdrawTransaction;

  const { mutation, resetTransaction, runTransaction } = lendingPoolTransaction;
  const dependantQueries = [
    lendingPoolQuery,
    nativeCoinQuery,
    token0Query,
    token1Query,
    aToken0Query,
    aToken1Query,
  ];

  const [title, loadingTitle] =
    selectedTab === TabType.DEPOSIT
      ? ["Deposit", "Depositing..."]
      : ["Withdraw", "Withdrawing..."];

  // use underlyingAssetAddress only for Withdraw Tab
  const tokenAddress = isDepositTab
    ? tokenData?.address
    : tokenData?.underlyingAssetAddress;

  const handleButtonClick = useCallback(() => {
    if (tokenData && tokenAddress) {
      const amount = toTokenAmount(inputValueBig, tokenData).toString();

      runTransaction(tokenAddress, amount);
    }
  }, [tokenAddress, tokenData, inputValueBig, runTransaction]);

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
