import { usePair } from "../../protected-perps-page/hooks/usePair";
import { getPositionSideTitle } from "../helpers/getPositionSideTitle";
import { PositionAction } from "../types/PositionAction";

import type { PositionSide } from "../types/PositionSide";

export const useTradeModalTitle = (
  positionAction: PositionAction,
  positionSide: PositionSide,
  pairId: string
) => {
  const { baseTokenSymbol } = usePair(pairId) ?? {};

  const positionActionTitle =
    positionAction === PositionAction.OPEN ? "Open" : "Close";
  const positionSideTitle = getPositionSideTitle(positionSide);
  const symbol = baseTokenSymbol ?? "";

  return `${positionActionTitle} ${positionSideTitle} ${symbol} Position`;
};
