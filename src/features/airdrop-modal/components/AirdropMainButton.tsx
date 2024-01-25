import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { getLockConfig } from "../../lock-page/helpers/getLockConfig";
import { useWallet } from "../../wallet/hooks/useWallet";

import { AirdropActionButton } from "./AirdropActionButton";

export const AirdropMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();
  const { chainId } = getLockConfig();

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (selectedChainId && selectedChainId !== chainId) {
    return <WrongNetworkMainButton />;
  }

  return <AirdropActionButton />;
};
