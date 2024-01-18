import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { useModal } from "../../shared/modal/hooks/useModal";
import { ModalType } from "../../shared/modal/types/ModalType";

import type { Position } from "../../queries/types/Position";
import type { ModalContextState } from "../../shared/modal/types/ModalContextState";
import type { FC } from "react";

interface OpenTradeModalButtonProps {
  readonly position: Position;
}

export const OpenTradeModalButton: FC<OpenTradeModalButtonProps> = ({
  position,
}) => {
  const { pushModal } = useModal();

  const handleButtonClick = useCallback(() => {
    const modalState: ModalContextState["modalState"] = {
      ...position,
    };

    pushModal(ModalType.CLOSE_POSITION, modalState);
  }, [pushModal, position]);

  return (
    <Button onClick={handleButtonClick} size="sm">
      Close
    </Button>
  );
};
