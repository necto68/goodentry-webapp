import { usePairOpenInterest } from "../../protected-perps-page/hooks/usePairOpenInterest";
import { usePairPrices } from "../../protected-perps-page/hooks/usePairPrices";
import { isPositionSideLong } from "../helpers/isPositionSideLong";
import { useTradePanelState } from "../stores/useTradePanelState";

export const useMaxPositionSize = () => {
  const { pairId, positionSide } = useTradePanelState();

  const { baseTokenPrice } = usePairPrices(pairId) ?? {};
  const {
    longOpenInterest,
    shortOpenInterest,
    longMaxOpenInterest,
    shortMaxOpenInterest,
  } = usePairOpenInterest(pairId) ?? {};

  const isLong = isPositionSideLong(positionSide);

  const longMaxPositionSize =
    longMaxOpenInterest && longOpenInterest && baseTokenPrice
      ? longMaxOpenInterest.sub(longOpenInterest).mul(baseTokenPrice)
      : undefined;
  const shortMaxPositionSize =
    shortMaxOpenInterest && shortOpenInterest
      ? shortMaxOpenInterest.sub(shortOpenInterest)
      : undefined;

  return isLong ? longMaxPositionSize : shortMaxPositionSize;
};
