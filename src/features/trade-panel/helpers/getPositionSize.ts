import type { TradePanelState } from "../types/TradePanelState";

export const getPositionSize = (
  quoteTokenInputState: TradePanelState["quoteTokenInputState"],
  selectedLeverage: TradePanelState["selectedLeverage"]
) => quoteTokenInputState.inputValueBig.mul(selectedLeverage);
