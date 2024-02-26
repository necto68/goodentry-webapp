import { exerciseFee } from "../constants/openPosition";

import type { TradePanelState } from "../types/TradePanelState";

export const getCollateralAmountIncludingFee = (
  inputValueBig: TradePanelState["quoteTokenInputState"]["inputValueBig"]
) => inputValueBig.add(exerciseFee);
