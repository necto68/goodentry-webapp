import { useModal } from "../../shared/modal/hooks/useModal";
import { LockWithdrawModalRoot } from "../components/LockWithdrawModalRoot";

export const LockWithdrawModal = () => {
  const { modalState } = useModal();

  const unlockScheduleId = modalState
    ? (modalState.unlockScheduleId as string)
    : "";

  return <LockWithdrawModalRoot unlockScheduleId={unlockScheduleId} />;
};
