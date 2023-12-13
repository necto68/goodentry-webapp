import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { useModal } from "../../shared/modal/hooks/useModal";
import { ModalType } from "../../shared/modal/types/ModalType";

import type { UnlockSchedule } from "../../queries/types/LockData";
import type { FC } from "react";

interface OpenLockWithdrawModalButtonProps {
  readonly unlockScheduleId: UnlockSchedule["id"];
}

export const OpenLockWithdrawModalButton: FC<
  OpenLockWithdrawModalButtonProps
> = ({ unlockScheduleId }) => {
  const { pushModal } = useModal();

  const handleButtonClick = useCallback(() => {
    const modalState = {
      unlockScheduleId,
    };

    pushModal(ModalType.LOCK_WITHDRAW, modalState);
  }, [pushModal, unlockScheduleId]);

  return (
    <Button onClick={handleButtonClick} size="sm">
      Withdraw
    </Button>
  );
};
