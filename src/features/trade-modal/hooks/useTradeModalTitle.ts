import { getTabTitle } from "../../trade-panel/helpers/formatters";
import { useTradeModalState } from "../stores/useTradeModalState";
import { TradeModalType } from "../types/TradeModalType";

export const useTradeModalTitle = () => {
  const { selectedTab, modalType } = useTradeModalState();

  const modalTypeTitle =
    modalType === TradeModalType.OPEN_POSITION ? "Open" : "Close";
  const sideTitle = getTabTitle(selectedTab);

  // TODO: v2 update
  const symbol = "SYMBOL";

  return `${modalTypeTitle} ${sideTitle} ${symbol} Position`;
};
