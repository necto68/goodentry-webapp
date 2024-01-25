import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { ErrorMainButton } from "../../form-components/components/ErrorMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { isInsufficientTokenAllowance } from "../../input-card/helpers/tokenBalance";
import { getZero } from "../../shared/helpers/bigjs";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { useWallet } from "../../wallet/hooks/useWallet";
import { useVaultStakeModalQueries } from "../hooks/useVaultStakeModalQueries";
import { useVaultStakeModalState } from "../stores/useVaultStakeModalState";
import { useVaultStakeModalTransactions } from "../stores/useVaultStakeModalTransactions";
import { TabType } from "../types/TabType";

import { ApproveMainButton } from "./ApproveMainButton";
import { StakeActionButton } from "./StakeActionButton";

// eslint-disable-next-line complexity,sonarjs/cognitive-complexity
export const StakeMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();

  const { selectedTab, vaultId } = useVaultStakeModalState();
  const { tokenApproveTransaction } = useVaultStakeModalTransactions();

  const { vaultTokenQuery, rewardTrackerDataQuery } =
    useVaultStakeModalQueries(vaultId);

  const { chainId } = getVaultConfig(vaultId);

  const isStakeTab = selectedTab === TabType.STAKE;

  const vaultTokenData = vaultTokenQuery.data;
  const rewardTrackerData = rewardTrackerDataQuery.data;

  const vaultTokenBalance = vaultTokenData?.balance ?? getZero();
  const stakedBalance = rewardTrackerData?.stakedBalance ?? getZero();

  const { isLoading: isTokenApproveMutationLoading } =
    tokenApproveTransaction.mutation;

  const isInsufficientAllowance = isInsufficientTokenAllowance(
    vaultTokenBalance,
    vaultTokenData
  );

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (selectedChainId && selectedChainId !== chainId) {
    return <WrongNetworkMainButton />;
  }

  if (isStakeTab && vaultTokenBalance.lte(0)) {
    return <ErrorMainButton title="No Unstaked Balance" />;
  }

  if (!isStakeTab && stakedBalance.lte(0)) {
    return <ErrorMainButton title="No Staked Balance" />;
  }

  if (
    isStakeTab &&
    (isInsufficientAllowance || isTokenApproveMutationLoading)
  ) {
    return <ApproveMainButton />;
  }

  return <StakeActionButton />;
};
