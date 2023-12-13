import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { ErrorMainButton } from "../../form-components/components/ErrorMainButton";
import { SuccessfulMainButton } from "../../form-components/components/SuccessfulMainButton";
import { TokenErrorMainButton } from "../../form-components/components/TokenErrorMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { ZeroBalanceMainButton } from "../../form-components/components/ZeroBalanceMainButton";
import { isInsufficientTokenAllowance } from "../../input-card/helpers/tokenBalance";
import { usePairChainId } from "../../protected-perps-page/hooks/usePairChainId";
import { useWallet } from "../../wallet/hooks/useWallet";
import { useLendingPoolModalTokenInputState } from "../hooks/useLendingPoolModalTokenInputState";
import { useLendingPoolModalState } from "../stores/useLendingPoolModalState";
import { useLendingPoolModalTransactions } from "../stores/useLendingPoolModalTransactions";
import { TabType } from "../types/TabType";

import { ApproveMainButton } from "./ApproveMainButton";
import { LendingPoolActionButton } from "./LendingPoolActionButton";

// eslint-disable-next-line sonarjs/cognitive-complexity,complexity
export const LendingPoolMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();
  const chainId = usePairChainId();

  const { selectedTab } = useLendingPoolModalState();
  const isDepositTab = selectedTab === TabType.DEPOSIT;

  const { tokenApproveTransaction, depositTransaction, withdrawTransaction } =
    useLendingPoolModalTransactions();

  const { tokenData, inputValueBig, isError, error } =
    useLendingPoolModalTokenInputState();

  const { isLoading: isTokenApproveMutationLoading } =
    tokenApproveTransaction.mutation;

  const { isSuccess } = isDepositTab
    ? depositTransaction.mutation
    : withdrawTransaction.mutation;

  const isZeroBalance = inputValueBig.lte(0);
  const isInsufficientAllowance = isInsufficientTokenAllowance(
    inputValueBig,
    tokenData
  );

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (selectedChainId && selectedChainId !== chainId) {
    return <WrongNetworkMainButton />;
  }

  if (isSuccess) {
    const title = isDepositTab ? "Deposit Successful" : "Withdraw Successful";

    return <SuccessfulMainButton title={title} />;
  }

  if (isZeroBalance) {
    return <ZeroBalanceMainButton />;
  }

  if (isError) {
    return <TokenErrorMainButton error={error} tokenData={tokenData} />;
  }

  // TODO: remove after unpause deposits
  if (isDepositTab) {
    return <ErrorMainButton title="Deposit is Paused" />;
  }

  if (isInsufficientAllowance || isTokenApproveMutationLoading) {
    return <ApproveMainButton />;
  }

  return <LendingPoolActionButton />;
};
