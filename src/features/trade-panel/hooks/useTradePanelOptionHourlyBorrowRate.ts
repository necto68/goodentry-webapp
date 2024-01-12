import { useOptionBorrowRates } from "../../protected-perps-page/hooks/useOptionBorrowRates";
import { getPositionSize } from "../helpers/getPositionSize";
import { TabType } from "../types/TabType";

import type { TradePanelState } from "../types/TradePanelState";

export const useTradePanelOptionHourlyBorrowRate = (
  selectedTab: TradePanelState["selectedTab"],
  selectedPairId: TradePanelState["selectedPairId"],
  quoteTokenInputState: TradePanelState["quoteTokenInputState"],
  selectedLeverage: TradePanelState["selectedLeverage"]
) => {
  const positionSize = getPositionSize(quoteTokenInputState, selectedLeverage);

  const { lowerOptionHourlyBorrowRate, upperOptionHourlyBorrowRate } =
    useOptionBorrowRates(selectedPairId, positionSize, selectedLeverage) ?? {};

  const isLongTab = selectedTab === TabType.LONG;

  return isLongTab ? upperOptionHourlyBorrowRate : lowerOptionHourlyBorrowRate;
};
