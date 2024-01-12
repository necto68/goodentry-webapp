import { getTabTitle } from "../../trade-panel/helpers/getTabTitle";
import { useTradePanelQueries } from "../../trade-panel/hooks/useTradePanelQueries";
import { useTradeModalState } from "../stores/useTradeModalState";
import { TradeModalType } from "../types/TradeModalType";

export const useTradeModalTitle = () => {
  const { selectedTab, selectedPairId, modalType } = useTradeModalState();
  const { baseTokenQuery } = useTradePanelQueries(selectedPairId);

  const baseTokenData = baseTokenQuery.data;

  const modalTypeTitle =
    modalType === TradeModalType.OPEN_POSITION ? "Open" : "Close";
  const sideTitle = getTabTitle(selectedTab);

  const symbol = baseTokenData ? baseTokenData.symbol : "";

  return `${modalTypeTitle} ${sideTitle} ${symbol} Position`;
};
