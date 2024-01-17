import { getTabTitle } from "../helpers/getTabTitle";
import { PositionActionType } from "../types/PositionActionType";

import { useTradePanelQueries } from "./useTradePanelQueries";

import type { TabType } from "../types/TabType";

export const useTradeModalTitle = (
  positionActionType: PositionActionType,
  tabType: TabType,
  pairId: string
) => {
  const { baseTokenQuery } = useTradePanelQueries(pairId);

  const baseTokenData = baseTokenQuery.data;

  const positionActionTypeTitle =
    positionActionType === PositionActionType.OPEN ? "Open" : "Close";
  const sideTitle = getTabTitle(tabType);
  const symbol = baseTokenData ? baseTokenData.symbol : "";

  return `${positionActionTypeTitle} ${sideTitle} ${symbol} Position`;
};
