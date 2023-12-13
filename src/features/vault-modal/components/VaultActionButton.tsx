import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { TransactionErrorMainButton } from "../../form-components/components/TransactionErrorMainButton";
import { toTokenAmount } from "../../input-card/helpers/tokenAmount";
import { getZero } from "../../shared/helpers/bigjs";
import { useVaultModalQueries } from "../hooks/useVaultModalQueries";
import { useVaultModalTokenInputState } from "../hooks/useVaultModalTokenInputState";
import { useVaultModalState } from "../stores/useVaultModalState";
import { useVaultModalTransactions } from "../stores/useVaultModalTransactions";
import { TabType } from "../types/TabType";

export const VaultActionButton = () => {
  const { selectedTab, vaultAddress, vaultId } = useVaultModalState();
  const isDepositTab = selectedTab === TabType.DEPOSIT;

  const { depositTransaction, withdrawTransaction } =
    useVaultModalTransactions();

  const { vaultQuery, nativeCoinQuery, token0Query, token1Query } =
    useVaultModalQueries(vaultId, vaultAddress);

  const { tokenData, inputValueBig } = useVaultModalTokenInputState();

  const vaultTransaction = isDepositTab
    ? depositTransaction
    : withdrawTransaction;

  const { mutation, resetTransaction, runTransaction } = vaultTransaction;
  const dependantQueries = [
    vaultQuery,
    nativeCoinQuery,
    token0Query,
    token1Query,
  ];

  const [title, loadingTitle] =
    selectedTab === TabType.DEPOSIT
      ? ["Deposit", "Depositing..."]
      : ["Withdraw", "Withdrawing..."];

  const handleButtonClick = useCallback(() => {
    if (tokenData) {
      const tokenAddress = tokenData.address;
      const amount = toTokenAmount(inputValueBig, tokenData).toString();

      runTransaction(tokenAddress, amount);
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
