import { useLendingPoolModalState } from "../stores/useLendingPoolModalState";
import { TabType } from "../types/TabType";

export const useLendingPoolModalTokenInputState = () => {
  const { selectedTab } = useLendingPoolModalState();
  const isDepositTab = selectedTab === TabType.DEPOSIT;

  const { depositTokenInputState, withdrawTokenInputState } =
    useLendingPoolModalState();

  return isDepositTab ? depositTokenInputState : withdrawTokenInputState;
};
