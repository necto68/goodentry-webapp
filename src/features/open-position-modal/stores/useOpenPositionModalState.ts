import { useModal } from "../../shared/modal/hooks/useModal";

import type { OpenPositionModalState } from "../types/OpenPositionModalState";

export const useOpenPositionModalState = () => {
  const { modalState } = useModal();

  return modalState as unknown as OpenPositionModalState;
};
