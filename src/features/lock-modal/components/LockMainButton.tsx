import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { SuccessfulMainButton } from "../../form-components/components/SuccessfulMainButton";
import { TokenErrorMainButton } from "../../form-components/components/TokenErrorMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { ZeroBalanceMainButton } from "../../form-components/components/ZeroBalanceMainButton";
import { getLockConfig } from "../../lock-page/helpers/getLockConfig";
import { useWallet } from "../../wallet/hooks/useWallet";
import { useLockModalTokenInputState } from "../hooks/useLockModalTokenInputState";
import { useLockModalState } from "../stores/useLockModalState";
import { useLockModalTransactions } from "../stores/useLockModalTransactions";
import { TabType } from "../types/TabType";

import { LockActionButton } from "./LockActionButton";

export const LockMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();
  const { chainId } = getLockConfig();

  const { selectedTab } = useLockModalState();
  const isLockTab = selectedTab === TabType.LOCK;

  const { lockTransaction, unlockTransaction } = useLockModalTransactions();

  const { tokenData, inputValueBig, isError, error } =
    useLockModalTokenInputState();

  const { isSuccess } = isLockTab
    ? lockTransaction.mutation
    : unlockTransaction.mutation;

  const isZeroBalance = inputValueBig.lte(0);

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (selectedChainId && selectedChainId !== chainId) {
    return <WrongNetworkMainButton />;
  }

  if (isSuccess) {
    const title = isLockTab ? "Lock Successful" : "Unlock Successful";

    return <SuccessfulMainButton title={title} />;
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
