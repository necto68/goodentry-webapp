import { useLockModalState } from "../stores/useLockModalState";
import { TabType } from "../types/TabType";

export const useLockModalTokenInputState = () => {
  const { selectedTab } = useLockModalState();
  const isLockTab = selectedTab === TabType.LOCK;

  const { lockTokenInputState, unlockTokenInputState } = useLockModalState();

  return isLockTab ? lockTokenInputState : unlockTokenInputState;
};
