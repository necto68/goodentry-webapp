import type { TabType } from "./TabType";
import type { TokenInputState } from "../../input-card/types/TokenInputState";
import type { PairConfig } from "../../pair/types/PairConfig";

export interface TradePanelState {
  selectedTab: TabType;
  setSelectedTab: (tab: TabType) => void;
  selectedPairId: PairConfig["id"];
  selectedTickerAddress: string | null;
  setSelectedTickerAddress: (tickerAddress: string | null) => void;
  tickerTokenInputState: TokenInputState;
}
