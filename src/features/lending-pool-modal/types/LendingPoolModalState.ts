import type { TabType } from "./TabType";
import type { TokenInputState } from "../../input-card/types/TokenInputState";

export interface LendingPoolModalState {
  selectedTab: TabType;
  setSelectedTab: (tab: TabType) => void;
  pairId: string;
  lendingPoolAddress: string;
  depositTokenInputState: TokenInputState;
  withdrawTokenInputState: TokenInputState;
}
