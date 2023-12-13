import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { useModal } from "../../shared/modal/hooks/useModal";
import { ModalType } from "../../shared/modal/types/ModalType";
import { TradeModalType } from "../../trade-modal/types/TradeModalType";
import { getTabTitle } from "../helpers/formatters";
import { useTicker } from "../hooks/useTicker";
import { useTradePanelState } from "../stores/useTradePanelState";
import { TabType } from "../types/TabType";

export const OpenTradeModalButton = () => {
  const { pushModal } = useModal();
  const {
    selectedTab,
    selectedPairId,
    selectedTickerAddress,
    tickerTokenInputState,
  } = useTradePanelState();
  const ticker = useTicker(selectedPairId, selectedTickerAddress);

  const isLongTab = selectedTab === TabType.LONG;
  const { symbol = "" } = ticker ?? {};

  const modalType = TradeModalType.OPEN_POSITION;

  const handleButtonClick = useCallback(() => {
    const modalState = {
      selectedTab,
      selectedPairId,
      selectedTickerAddress,
      tickerTokenInputState,
      modalType,
    };

    pushModal(ModalType.TRADE, modalState);
  }, [
    pushModal,
    selectedTab,
    selectedPairId,
    selectedTickerAddress,
    tickerTokenInputState,
    modalType,
  ]);

  const sideTitle = getTabTitle(selectedTab);

  return (
    <Button
      onClick={handleButtonClick}
      variant={isLongTab ? "brand" : "error"}
    >{`${sideTitle} ${symbol}`}</Button>
  );
};
