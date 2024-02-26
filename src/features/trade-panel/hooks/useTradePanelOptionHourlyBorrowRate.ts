import { useOptionBorrowRates } from "../../protected-perps-page/hooks/useOptionBorrowRates";
import { getPositionSize } from "../helpers/getPositionSize";
import { isPositionSideLong } from "../helpers/isPositionSideLong";

import type { TradePanelState } from "../types/TradePanelState";

export const useTradePanelOptionHourlyBorrowRate = (
  positionSide: TradePanelState["positionSide"],
  pairId: TradePanelState["pairId"],
  quoteTokenInputState: TradePanelState["quoteTokenInputState"],
  leverage: TradePanelState["leverage"]
) => {
  const positionSize = getPositionSize(quoteTokenInputState, leverage);

  const { lowerOptionHourlyBorrowRate, upperOptionHourlyBorrowRate } =
    useOptionBorrowRates(pairId, positionSize) ?? {};

  const isLong = isPositionSideLong(positionSide);

  return isLong ? upperOptionHourlyBorrowRate : lowerOptionHourlyBorrowRate;
};
