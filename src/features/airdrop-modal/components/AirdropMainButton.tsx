import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { SuccessfulMainButton } from "../../form-components/components/SuccessfulMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { getLockConfig } from "../../lock-page/helpers/getLockConfig";
import { useWallet } from "../../wallet/hooks/useWallet";
import { useClaimTransaction } from "../hooks/useClaimTransaction";

import { AirdropActionButton } from "./AirdropActionButton";

export const AirdropMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();
  const { chainId } = getLockConfig();

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

  return <AirdropActionButton />;
};
