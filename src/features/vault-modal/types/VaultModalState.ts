import type { TabType } from "./TabType";
import type { TokenInputState } from "../../input-card/types/TokenInputState";

export interface VaultModalState {
  selectedTab: TabType;
  setSelectedTab: (tab: TabType) => void;
  vaultId: string;
  depositTokenInputState: TokenInputState;
  withdrawTokenInputState: TokenInputState;
}
