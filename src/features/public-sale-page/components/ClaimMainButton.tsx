import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { useWallet } from "../../wallet/hooks/useWallet";
import { getPublicSaleConfig } from "../helpers/getPublicSaleConfig";

import { ClaimActionButton } from "./ClaimActionButton";

export const ClaimMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();
  const { chainId } = getPublicSaleConfig();

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (selectedChainId && selectedChainId !== chainId) {
    return <WrongNetworkMainButton />;
  }

  return <ClaimActionButton />;
};
