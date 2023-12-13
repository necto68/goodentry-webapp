import { useModal } from "../../shared/modal/hooks/useModal";

import type { AssetPrices } from "../../queries/types/AssetPrices";
import type { Position } from "../../queries/types/Position";

export const useSocialShareModalState = () => {
  const { modalState } = useModal();

  const position = modalState?.position as Position;
  const currentPrice = modalState?.currentPrice as AssetPrices["currentPrice"];

  return {
    position,
    currentPrice,
  };
};
