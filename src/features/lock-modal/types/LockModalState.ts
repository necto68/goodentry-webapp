import type { TabType } from "./TabType";
import type { TokenInputState } from "../../input-card/types/TokenInputState";

export interface LockModalState {
  selectedTab: TabType;
  setSelectedTab: (tab: TabType) => void;
  lockTokenInputState: TokenInputState;
  unlockTokenInputState: TokenInputState;
}
