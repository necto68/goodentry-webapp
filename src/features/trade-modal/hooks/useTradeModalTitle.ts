import { getTabTitle } from "../../trade-panel/helpers/formatters";
import { useTicker } from "../../trade-panel/hooks/useTicker";
import { useTradeModalState } from "../stores/useTradeModalState";
import { TradeModalType } from "../types/TradeModalType";

export const useTradeModalTitle = () => {
  const { selectedTab, selectedPairId, selectedTickerAddress, modalType } =
    useTradeModalState();
  const ticker = useTicker(selectedPairId, selectedTickerAddress);

  const { symbol = "" } = ticker ?? {};

  const modalTypeTitle =
    modalType === TradeModalType.OPEN_POSITION ? "Open" : "Close";
  const sideTitle = getTabTitle(selectedTab);

  return `${modalTypeTitle} ${sideTitle} ${symbol} Position`;
};
