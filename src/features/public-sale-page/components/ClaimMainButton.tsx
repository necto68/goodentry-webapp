import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { SuccessfulMainButton } from "../../form-components/components/SuccessfulMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { useWallet } from "../../wallet/hooks/useWallet";
import { getPublicSaleConfig } from "../helpers/getPublicSaleConfig";
import { useClaimTransaction } from "../hooks/useClaimTransaction";

import { ClaimActionButton } from "./ClaimActionButton";

export const ClaimMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();
  const { chainId } = getPublicSaleConfig();

  const claimTransaction = useClaimTransaction();

  const { isSuccess } = claimTransaction.mutation;

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (selectedChainId && selectedChainId !== chainId) {
    return <WrongNetworkMainButton />;
  }

  if (isSuccess) {
    return <SuccessfulMainButton title="Claim Successful" />;
  }

  return <ClaimActionButton />;
};
