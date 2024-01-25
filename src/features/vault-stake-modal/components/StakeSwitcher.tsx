import { BiArrowFromBottom, BiArrowToBottom } from "react-icons/bi";

import { Switcher } from "../../form-components/components/Switcher";
import { useVaultStakeModalState } from "../stores/useVaultStakeModalState";
import { TabType } from "../types/TabType";

export const StakeSwitcher = () => {
  const { selectedTab, setSelectedTab } = useVaultStakeModalState();
  const isStakeTab = selectedTab === TabType.STAKE;

  const handleTabClick = (tab: number) => {
    setSelectedTab(tab === 0 ? TabType.STAKE : TabType.UNSTAKE);
  };

  return (
    <Switcher
      icon0={<BiArrowToBottom size={18} />}
      icon1={<BiArrowFromBottom size={18} />}
      onTabClick={handleTabClick}
      tab={isStakeTab ? 0 : 1}
      title0="Stake"
      title1="Unstake"
    />
  );
};
