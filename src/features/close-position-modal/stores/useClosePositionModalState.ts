import { useModal } from "../../shared/modal/hooks/useModal";

import type { ClosePositionModalState } from "../types/ClosePositionModalState";

export const useClosePositionModalState = () => {
  const { modalState } = useModal();

  return modalState as unknown as ClosePositionModalState;
};
