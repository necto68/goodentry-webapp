import type { TradePanelState } from "../types/TradePanelState";

export const getPositionSize = (
  quoteTokenInputState: TradePanelState["quoteTokenInputState"],
  leverage: TradePanelState["leverage"]
) => quoteTokenInputState.inputValueBig.mul(leverage);
