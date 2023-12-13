import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { SuccessfulMainButton } from "../../form-components/components/SuccessfulMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { getLockConfig } from "../../lock-page/helpers/getLockConfig";
import { useWallet } from "../../wallet/hooks/useWallet";
import { useLockWithdrawModalTransactions } from "../stores/useLockWithdrawModalTransactions";

import { LockWithdrawActionButton } from "./LockWithdrawActionButton";

export const LockWithdrawMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();
  const { chainId } = getLockConfig();

  const { withdrawTransaction } = useLockWithdrawModalTransactions();

  const { isSuccess } = withdrawTransaction.mutation;

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (selectedChainId && selectedChainId !== chainId) {
    return <WrongNetworkMainButton />;
  }

  if (isSuccess) {
    return <SuccessfulMainButton title="Withdraw Successful" />;
  }

  return <LockWithdrawActionButton />;
};
