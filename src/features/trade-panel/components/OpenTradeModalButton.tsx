import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { useModal } from "../../shared/modal/hooks/useModal";
import { ModalType } from "../../shared/modal/types/ModalType";
import { TradeModalType } from "../../trade-modal/types/TradeModalType";
import { getTabTitle } from "../helpers/getTabTitle";
import { useTradePanelQueries } from "../hooks/useTradePanelQueries";
import { useTradePanelState } from "../stores/useTradePanelState";
import { TabType } from "../types/TabType";

export const OpenTradeModalButton = () => {
  const { pushModal } = useModal();
  const {
    selectedTab,
    selectedPairId,
    quoteTokenInputState,
    selectedLeverage,
  } = useTradePanelState();

  const { baseTokenQuery } = useTradePanelQueries(selectedPairId);
  const baseTokenData = baseTokenQuery.data;

  const isLongTab = selectedTab === TabType.LONG;

  const modalType = TradeModalType.OPEN_POSITION;

  const handleButtonClick = useCallback(() => {
    const modalState = {
      selectedTab,
      selectedPairId,
      quoteTokenInputState,
      selectedLeverage,
      modalType,
    };

    pushModal(ModalType.TRADE, modalState);
  }, [
    pushModal,
    selectedTab,
    selectedPairId,
    quoteTokenInputState,
    selectedLeverage,
    modalType,
  ]);

  const sideTitle = getTabTitle(selectedTab);

  const symbol = baseTokenData ? baseTokenData.symbol : loadingPlaceholder;

  return (
    <Button
      onClick={handleButtonClick}
      variant={isLongTab ? "brand" : "error"}
    >{`${sideTitle} ${symbol}`}</Button>
  );
};
