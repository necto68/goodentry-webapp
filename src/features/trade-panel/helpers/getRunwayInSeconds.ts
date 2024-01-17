import { getZero } from "../../shared/helpers/bigjs";

import { getPositionSize } from "./getPositionSize";

import type { OptionBorrowRates } from "../../queries/types/OptionBorrowRates";
import type { TradePanelState } from "../types/TradePanelState";

export const getRunwayInSeconds = (
  quoteTokenInputState: TradePanelState["quoteTokenInputState"],
  leverage: TradePanelState["leverage"],
  optionHourlyBorrowRate:
    | OptionBorrowRates["lowerOptionHourlyBorrowRate"]
    | undefined
) => {
  if (optionHourlyBorrowRate === undefined) {
    return undefined;
  }

  const positionSize = getPositionSize(quoteTokenInputState, leverage);

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
