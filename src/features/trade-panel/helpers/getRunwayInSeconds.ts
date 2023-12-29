import { getZero } from "../../shared/helpers/bigjs";

import type { OptionBorrowRates } from "../../queries/types/OptionBorrowRates";
import type { TradePanelState } from "../types/TradePanelState";
import type Big from "big.js";

export const getRunwayInSeconds = (
  quoteTokenInputState: TradePanelState["quoteTokenInputState"],
  positionSize: Big,
  optionHourlyBorrowRate: OptionBorrowRates["lowerOptionHourlyBorrowRate"]
) => {
  if (positionSize.lte(0) || optionHourlyBorrowRate === null) {
    return null;
  }

  const hourlyCost = positionSize.mul(optionHourlyBorrowRate);
  const runwayInHours = hourlyCost.gt(0)
    ? quoteTokenInputState.inputValueBig.div(hourlyCost)
    : getZero();

  const secondsInHour = 60 * 60;
  const runwayInSeconds = runwayInHours.mul(secondsInHour);

  return runwayInSeconds.round().toNumber();
};
