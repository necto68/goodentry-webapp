import { usePositions } from "../../protected-perps-page/hooks/usePositions";

import type { TradePanelState } from "../types/TradePanelState";

export const useOpenedPositions = (
  selectedPairId: TradePanelState["selectedPairId"]
) => {
  const positions = usePositions();

  if (!positions) {
    return [];
  }

  return positions.filter((position) => position.pairId === selectedPairId);
};
