import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { ErrorMainButton } from "../../form-components/components/ErrorMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { getZero } from "../../shared/helpers/bigjs";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { useWallet } from "../../wallet/hooks/useWallet";
import { useVaultStakeModalQueries } from "../hooks/useVaultStakeModalQueries";
import { useVaultStakeModalState } from "../stores/useVaultStakeModalState";

import { ClaimActionButton } from "./ClaimActionButton";

export const ClaimMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();

  const { vaultId } = useVaultStakeModalState();
  const { rewardTrackerDataQuery } = useVaultStakeModalQueries(vaultId);

  const { chainId } = getVaultConfig(vaultId);

  const rewardTrackerData = rewardTrackerDataQuery.data;
  const claimableBalance = rewardTrackerData?.claimableBalance ?? getZero();

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (selectedChainId && selectedChainId !== chainId) {
    return <WrongNetworkMainButton />;
  }

  if (claimableBalance.lte(0)) {
    return <ErrorMainButton title="No Claimable Balance" />;
  }

  return <ClaimActionButton />;
};
