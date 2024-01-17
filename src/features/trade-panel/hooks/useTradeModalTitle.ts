import { getPositionSideTitle } from "../helpers/getPositionSideTitle";
import { PositionAction } from "../types/PositionAction";

import { useTradePanelQueries } from "./useTradePanelQueries";

import type { PositionSide } from "../types/PositionSide";

export const useTradeModalTitle = (
  positionAction: PositionAction,
  positionSide: PositionSide,
  pairId: string
) => {
  const { baseTokenQuery } = useTradePanelQueries(pairId);

  const baseTokenData = baseTokenQuery.data;

  const positionActionTitle =
    positionAction === PositionAction.OPEN ? "Open" : "Close";
  const positionSideTitle = getPositionSideTitle(positionSide);
  const symbol = baseTokenData ? baseTokenData.symbol : "";

  return `${positionActionTitle} ${positionSideTitle} ${symbol} Position`;
};
