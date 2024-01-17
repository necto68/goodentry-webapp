import { BiSolidLockAlt, BiSolidLockOpenAlt } from "react-icons/bi";

import { Switcher } from "../../form-components/components/Switcher";
import { useLockModalState } from "../stores/useLockModalState";
import { TabType } from "../types/TabType";

export const LockSwitcher = () => {
  const { selectedTab, setSelectedTab } = useLockModalState();
  const isLockTab = selectedTab === TabType.LOCK;

  const handleTabClick = (tab: number) => {
    setSelectedTab(tab === 0 ? TabType.LOCK : TabType.UNLOCK);
  };

  return (
    <Switcher
      icon0={<BiSolidLockAlt size={18} />}
      icon1={<BiSolidLockOpenAlt size={18} />}
      onTabClick={handleTabClick}
      tab={isLockTab ? 0 : 1}
      title0="Lock"
      title1="Unlock"
    />
  );
};
