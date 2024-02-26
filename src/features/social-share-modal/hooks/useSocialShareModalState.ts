import { useModal } from "../../shared/modal/hooks/useModal";

import type { Position } from "../../queries/types/Position";

export const useSocialShareModalState = () => {
  const { modalState } = useModal();

  const position = modalState?.position as Position;

  return {
    position,
  };
};
