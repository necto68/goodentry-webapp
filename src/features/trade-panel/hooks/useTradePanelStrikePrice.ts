import { usePairPrices } from "../../protected-perps-page/hooks/usePairPrices";
import { useTradePanelState } from "../stores/useTradePanelState";
import { TabType } from "../types/TabType";

export const useTradePanelStrikePrice = () => {
  const { selectedTab, selectedPairId } = useTradePanelState();
  const { lowerStrikePrice, upperStrikePrice } =
    usePairPrices(selectedPairId) ?? {};

  const isLongTab = selectedTab === TabType.LONG;

  return isLongTab ? upperStrikePrice : lowerStrikePrice;
};
