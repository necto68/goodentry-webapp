import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { useWallet } from "../../wallet/hooks/useWallet";
import { useTradeModalState } from "../stores/useTradeModalState";
import { TradeModalType } from "../types/TradeModalType";

import { ClosePositionButton } from "./ClosePositionButton";
import { OpenPositionButton } from "./OpenPositionButton";

export const TradeModalMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();
  const { modalType, selectedPairId } = useTradeModalState();

  const { chainId } = getPairConfig(selectedPairId);

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (selectedChainId && selectedChainId !== chainId) {
    return <WrongNetworkMainButton />;
  }

  return modalType === TradeModalType.OPEN_POSITION ? (
    <OpenPositionButton />
  ) : (
    <ClosePositionButton />
  );
};
