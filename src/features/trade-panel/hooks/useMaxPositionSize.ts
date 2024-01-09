import { usePairOpenInterest } from "../../protected-perps-page/hooks/usePairOpenInterest";
import { usePairPrices } from "../../protected-perps-page/hooks/usePairPrices";
import { useTradePanelState } from "../stores/useTradePanelState";
import { TabType } from "../types/TabType";

export const useMaxPositionSize = () => {
  const { selectedPairId, selectedTab } = useTradePanelState();

  const { baseTokenPrice } = usePairPrices(selectedPairId) ?? {};
  const {
    longOpenInterest,
    shortOpenInterest,
    longMaxOpenInterest,
    shortMaxOpenInterest,
  } = usePairOpenInterest(selectedPairId) ?? {};

  const isLongTab = selectedTab === TabType.LONG;

  const longMaxPositionSize =
    longMaxOpenInterest && longOpenInterest && baseTokenPrice
      ? longMaxOpenInterest.sub(longOpenInterest).mul(baseTokenPrice)
      : undefined;
  const shortMaxPositionSize =
    shortMaxOpenInterest && shortOpenInterest
      ? shortMaxOpenInterest.sub(shortOpenInterest)
      : undefined;

  return isLongTab ? longMaxPositionSize : shortMaxPositionSize;
};
