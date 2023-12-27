import type { TradeModalType } from "./TradeModalType";
import type { TradePanelState } from "../../trade-panel/types/TradePanelState";

export interface TradeModalState
  extends Pick<
    TradePanelState,
    "quoteTokenInputState" | "selectedPairId" | "selectedTab"
  > {
  modalType: TradeModalType;
}
