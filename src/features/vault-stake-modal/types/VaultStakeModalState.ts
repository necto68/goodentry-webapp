import type { TabType } from "./TabType";

export interface VaultStakeModalState {
  selectedTab: TabType;
  setSelectedTab: (tab: TabType) => void;
  vaultId: string;
}
