import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import type { Position } from "../../queries/types/Position";
import type { FC } from "react";

interface OpenTradeModalButtonProps {
  readonly position: Position;
}

export const OpenTradeModalButton: FC<OpenTradeModalButtonProps> = () => {
  // TODO: v2 update
  // const { pushModal } = useModal();

  // const { side, size, pairId: selectedPairId } = position;
  //
  // const quoteTokenInputState = useTokenInputState([]);
  //
  // const selectedTab = side === PositionSide.LONG ?
  // TabType.LONG : TabType.SHORT;
  // const modalType = TradeModalType.CLOSE_POSITION;

  // const sizeValue = size.toString();

  // useEffect(() => {
  //   if (quoteTokenInputState.inputValue !== sizeValue) {
  //     quoteTokenInputState.setInputValue(sizeValue);
  //   }
  // }, [sizeValue, quoteTokenInputState]);

  const handleButtonClick = useCallback(() => {
    // const modalState = {
    //   selectedTab,
    //   selectedPairId,
    //   quoteTokenInputState,
    //   modalType,
    // };
    //
    // pushModal(ModalType.TRADE, modalState);
  }, []);

  return (
    <Button onClick={handleButtonClick} size="sm">
      Close
    </Button>
  );
};
