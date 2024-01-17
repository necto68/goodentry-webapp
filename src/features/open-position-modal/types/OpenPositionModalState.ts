import type { TradePanelState } from "../../trade-panel/types/TradePanelState";

export type OpenPositionModalState = Pick<
  TradePanelState,
  "quoteTokenInputState" | "selectedLeverage" | "selectedPairId" | "selectedTab"
>;
