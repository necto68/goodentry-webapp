import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { useWallet } from "../../wallet/hooks/useWallet";
import { useClosePositionModalState } from "../stores/useClosePositionModalState";

import { ClosePositionButton } from "./ClosePositionButton";

export const ClosePositionModalMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();

  const { pairId } = useClosePositionModalState();

  const { chainId } = getPairConfig(pairId);

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (selectedChainId && selectedChainId !== chainId) {
    return <WrongNetworkMainButton />;
  }

  return <ClosePositionButton />;
};
