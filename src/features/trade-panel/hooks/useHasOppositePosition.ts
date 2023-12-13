import { usePositions } from "../../protected-perps-page/hooks/usePositions";
import { PositionSide } from "../../queries/types/Position";
import { areAddressesEqual } from "../../web3/helpers/addresses";
import { TabType } from "../types/TabType";

import type { TradePanelState } from "../types/TradePanelState";

export const useHasOppositePosition = (
  selectedTab: TradePanelState["selectedTab"],
  selectedTickerAddress: TradePanelState["selectedTickerAddress"]
) => {
  const positions = usePositions();

  if (!positions || !selectedTickerAddress) {
    return false;
  }

  return positions.some((position) => {
    const isSameTicker = areAddressesEqual(
      position.ticker.address,
      selectedTickerAddress
    );

    const isOppositeSide =
      (selectedTab === TabType.LONG && position.side === PositionSide.SHORT) ||
      (selectedTab === TabType.SHORT && position.side === PositionSide.LONG);

    return isSameTicker && isOppositeSide;
  });
};
