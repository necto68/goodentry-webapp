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

  const { side, size } = position;

  const tickerTokenInputState = useTokenInputState([]);

  const selectedTab = side === PositionSide.LONG ? TabType.LONG : TabType.SHORT;
  const modalType = TradeModalType.CLOSE_POSITION;

  const sizeValue = size.toString();

  useEffect(() => {
    if (tickerTokenInputState.inputValue !== sizeValue) {
      tickerTokenInputState.setInputValue(sizeValue);
    }
  }, [sizeValue, tickerTokenInputState]);

  const handleButtonClick = useCallback(() => {
    // TODO: v2 update
    const modalState = {
      selectedTab,
      tickerTokenInputState,
      modalType,
    };

    pushModal(ModalType.TRADE, modalState);
  }, [pushModal, selectedTab, tickerTokenInputState, modalType]);

  return (
    <Button onClick={handleButtonClick} size="sm">
      Close
    </Button>
  );
};
