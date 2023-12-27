import { Button } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";

import { useTokenInputState } from "../../input-card/hooks/useTokenInputState";
import { PositionSide } from "../../queries/types/Position";
import { useModal } from "../../shared/modal/hooks/useModal";
import { ModalType } from "../../shared/modal/types/ModalType";
import { TradeModalType } from "../../trade-modal/types/TradeModalType";
import { TabType } from "../../trade-panel/types/TabType";

import type { Position } from "../../queries/types/Position";
import type { FC } from "react";

interface OpenTradeModalButtonProps {
  readonly position: Position;
}

export const OpenTradeModalButton: FC<OpenTradeModalButtonProps> = ({
  position,
}) => {
  const { pushModal } = useModal();

  const { side, size, pairId: selectedPairId } = position;

  const quoteTokenInputState = useTokenInputState([]);

  const selectedTab = side === PositionSide.LONG ? TabType.LONG : TabType.SHORT;
  const modalType = TradeModalType.CLOSE_POSITION;

  const sizeValue = size.toString();

  useEffect(() => {
    if (quoteTokenInputState.inputValue !== sizeValue) {
      quoteTokenInputState.setInputValue(sizeValue);
    }
  }, [sizeValue, quoteTokenInputState]);

  const handleButtonClick = useCallback(() => {
    const modalState = {
      selectedTab,
      selectedPairId,
      quoteTokenInputState,
      modalType,
    };

    pushModal(ModalType.TRADE, modalState);
  }, [pushModal, selectedTab, selectedPairId, quoteTokenInputState, modalType]);

  return (
    <Button onClick={handleButtonClick} size="sm">
      Close
    </Button>
  );
};
