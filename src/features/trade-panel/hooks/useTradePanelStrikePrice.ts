import { usePairPrices } from "../../protected-perps-page/hooks/usePairPrices";
import { isPositionSideLong } from "../helpers/isPositionSideLong";

import type { TradePanelState } from "../types/TradePanelState";

export const useTradePanelStrikePrice = (
  positionSide: TradePanelState["positionSide"],
  pairId: TradePanelState["pairId"]
) => {
  const { lowerStrikePrice, upperStrikePrice } = usePairPrices(pairId) ?? {};

  return isPositionSideLong(positionSide) ? upperStrikePrice : lowerStrikePrice;
};
