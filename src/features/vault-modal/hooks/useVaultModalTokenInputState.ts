import { useVaultModalState } from "../stores/useVaultModalState";
import { TabType } from "../types/TabType";

export const useVaultModalTokenInputState = () => {
  const { selectedTab } = useVaultModalState();
  const isDepositTab = selectedTab === TabType.DEPOSIT;

  const { depositTokenInputState, withdrawTokenInputState } =
    useVaultModalState();

  return isDepositTab ? depositTokenInputState : withdrawTokenInputState;
};
