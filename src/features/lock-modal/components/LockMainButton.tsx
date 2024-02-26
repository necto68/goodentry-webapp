import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { TokenErrorMainButton } from "../../form-components/components/TokenErrorMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { ZeroBalanceMainButton } from "../../form-components/components/ZeroBalanceMainButton";
import { getLockConfig } from "../../lock-page/helpers/getLockConfig";
import { useWallet } from "../../wallet/hooks/useWallet";
import { useLockModalTokenInputState } from "../hooks/useLockModalTokenInputState";

import { LockActionButton } from "./LockActionButton";

export const LockMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();
  const { chainId } = getLockConfig();

  const { tokenData, inputValueBig, isError, error } =
    useLockModalTokenInputState();

  const isZeroBalance = inputValueBig.lte(0);

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (selectedChainId && selectedChainId !== chainId) {
    return <WrongNetworkMainButton />;
  }

  if (isZeroBalance) {
    return <ZeroBalanceMainButton />;
  }

  if (isError) {
    return <TokenErrorMainButton error={error} tokenData={tokenData} />;
  }

  // no need ApproveMainButton here
  // as neither lock nor unlock require approval

  return <LockActionButton />;
};
