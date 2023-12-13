import { BiArrowFromBottom, BiArrowToBottom } from "react-icons/bi";

import { Switcher } from "../../form-components/components/Switcher";
import { useVaultModalState } from "../stores/useVaultModalState";
import { TabType } from "../types/TabType";

export const VaultSwitcher = () => {
  const { selectedTab, setSelectedTab } = useVaultModalState();
  const isDepositTab = selectedTab === TabType.DEPOSIT;

  const handleTabClick = (tab: number) => {
    setSelectedTab(tab === 0 ? TabType.DEPOSIT : TabType.WITHDRAW);
  };

  return (
    <Switcher
      icon0={<BiArrowToBottom size={18} />}
      icon1={<BiArrowFromBottom size={18} />}
      onTabClick={handleTabClick}
      selectedTab={isDepositTab ? 0 : 1}
      title0="Deposit"
      title1="Withdraw"
    />
  );
};
