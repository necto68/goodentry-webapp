import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { useModal } from "../../shared/modal/hooks/useModal";
import { ModalType } from "../../shared/modal/types/ModalType";
import { TradeModalType } from "../../trade-modal/types/TradeModalType";
import { getTabTitle } from "../helpers/formatters";
import { useTradePanelState } from "../stores/useTradePanelState";
import { TabType } from "../types/TabType";

export const OpenTradeModalButton = () => {
  const { pushModal } = useModal();
  const { selectedTab, selectedPairId, quoteTokenInputState } =
    useTradePanelState();

  const isLongTab = selectedTab === TabType.LONG;

  const modalType = TradeModalType.OPEN_POSITION;

  const handleButtonClick = useCallback(() => {
    const modalState = {
      selectedTab,
      selectedPairId,
      quoteTokenInputState,
      modalType,
    };

    pushModal(ModalType.TRADE, modalState);
  }, [pushModal, selectedTab, selectedPairId, quoteTokenInputState, modalType]);

  const sideTitle = getTabTitle(selectedTab);

  // TODO: v2 update
  const symbol = "SYMBOL";

  return (
    <Button
      onClick={handleButtonClick}
      variant={isLongTab ? "brand" : "error"}
    >{`${sideTitle} ${symbol}`}</Button>
  );
};
