import { usePairPrices } from "../../protected-perps-page/hooks/usePairPrices";
import { TabType } from "../types/TabType";

import type { TradePanelState } from "../types/TradePanelState";

export const useTradePanelStrikePrice = (
  selectedTab: TradePanelState["selectedTab"],
  selectedPairId: TradePanelState["selectedPairId"]
) => {
  const { lowerStrikePrice, upperStrikePrice } =
    usePairPrices(selectedPairId) ?? {};

  const isLongTab = selectedTab === TabType.LONG;

  return isLongTab ? upperStrikePrice : lowerStrikePrice;
};
