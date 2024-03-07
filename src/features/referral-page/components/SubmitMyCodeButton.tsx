import { Button } from "@chakra-ui/react";

import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { TransactionErrorMainButton } from "../../form-components/components/TransactionErrorMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { useReferralsQuery } from "../../queries/hooks/useReferralsQuery";
import { useToast } from "../../toast/hooks/useToast";
import { ToastType } from "../../toast/types/ToastType";
import { useWallet } from "../../wallet/hooks/useWallet";
import { ChainId } from "../../web3/types/ChainId";
import { getReferralLink, setToClipboard } from "../helpers/referralLink";
import { useReferrals } from "../hooks/useReferrals";
import { useReferralModalState } from "../stores/useReferralModalState";
import { useReferralModalTransactions } from "../stores/useReferralModalTransactions";

export const SubmitMyCodeButton = () => {
  const toast = useToast();
  const { isConnected, chainId } = useWallet();
  const { myReferralCodeInputState } = useReferralModalState();
  const { setMyRefCode: setMyReferenceCode } = useReferralModalTransactions();
  const { mutation, resetTransaction, runTransaction } = setMyReferenceCode;
  const { myReferralCode = "" } = useReferrals() ?? {};
  const { isLoading: isDataLoading } = useReferralsQuery();

  const handleButtonClick = () => {
    runTransaction(myReferralCodeInputState);
  };

  const handleCopyButtonClick = () => {
    void setToClipboard(getReferralLink(myReferralCode));
    toast({
      type: ToastType.SUCCESS,
      title: "Referral link copied",
    });
  };

  const { isError, isLoading } = mutation;

  if (isError) {
    return <TransactionErrorMainButton resetTransaction={resetTransaction} />;
  }

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (isDataLoading) {
    return <Button isLoading={isDataLoading} />;
  }

  if (chainId && chainId !== ChainId.ARBITRUM) {
    return <WrongNetworkMainButton />;
  }

  if (myReferralCode) {
    return (
      <Button isLoading={isLoading} onClick={handleCopyButtonClick}>
        Copy
      </Button>
    );
  }

  return (
    <Button
      isDisabled={!myReferralCodeInputState}
      isLoading={isLoading}
      onClick={handleButtonClick}
      variant="brand"
    >
      Create my referral code
    </Button>
  );
};
