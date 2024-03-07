import { Button } from "@chakra-ui/react";

import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { TransactionErrorMainButton } from "../../form-components/components/TransactionErrorMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { useReferralsQuery } from "../../queries/hooks/useReferralsQuery";
import { useWallet } from "../../wallet/hooks/useWallet";
import { ChainId } from "../../web3/types/ChainId";
import { useReferrals } from "../hooks/useReferrals";
import { useReferralModalState } from "../stores/useReferralModalState";
import { useReferralModalTransactions } from "../stores/useReferralModalTransactions";

export const SubmitReferrerButton = () => {
  const { isConnected, chainId } = useWallet();
  const { referralCodeInputState } = useReferralModalState();
  const { setReferrer } = useReferralModalTransactions();
  const { referrerCode = "" } = useReferrals() ?? {};
  const { isLoading: isDataLoading } = useReferralsQuery();
  const { mutation, resetTransaction, runTransaction } = setReferrer;

  const handleButtonClick = () => {
    runTransaction(referralCodeInputState);
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

  if (referrerCode) {
    return <Button disabled>Referer applied</Button>;
  }

  return (
    <Button isLoading={isLoading} onClick={handleButtonClick} variant="brand">
      Activate Referral
    </Button>
  );
};
