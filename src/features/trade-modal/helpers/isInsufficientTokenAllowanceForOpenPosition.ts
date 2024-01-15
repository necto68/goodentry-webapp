import { isInsufficientTokenAllowance } from "../../input-card/helpers/tokenBalance";
import { exerciseFee } from "../../trade-panel/constants/openPosition";

import type { useTradePanelQueries } from "../../trade-panel/hooks/useTradePanelQueries";
import type { TradePanelState } from "../../trade-panel/types/TradePanelState";

export const isInsufficientTokenAllowanceForOpenPosition = (
  quoteTokenInputState: TradePanelState["quoteTokenInputState"],
  quoteTokenQuery: ReturnType<typeof useTradePanelQueries>["quoteTokenQuery"]
) => {
  const { inputValueBig } = quoteTokenInputState;

  // use quoteTokenQuery.data instead of quoteTokenInputState.tokenData
  // because it will be refetched after approve transaction
  const quoteTokenData = quoteTokenQuery.data;

  // check allowance for inputValueBig + exerciseFee
  // because opening position transaction will include fee
  const collateralValue = inputValueBig.add(exerciseFee);

  return isInsufficientTokenAllowance(collateralValue, quoteTokenData);
};
