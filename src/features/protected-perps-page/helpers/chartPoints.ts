import { isPositionSideLong } from "../../trade-panel/helpers/isPositionSideLong";
import { POINTS_AMOUNT } from "../constants/chartPoints";

import type { ChartPoint } from "../../interactive-chart/types/ChartPoint";
import type { PositionSide } from "../../trade-panel/types/PositionSide";

export const getShift = (
  positionSide: PositionSide,
  baseTokenPrice: number,
  strikePrice: number
) => {
  if (isPositionSideLong(positionSide) && strikePrice < baseTokenPrice) {
    return strikePrice - baseTokenPrice;
  }

  if (!isPositionSideLong(positionSide) && strikePrice > baseTokenPrice) {
    return baseTokenPrice - strikePrice;
  }

  return 0;
};

export const getChartPoints = (
  positionSide: PositionSide,
  baseTokenPrice: number,
  strikePrice: number
): ChartPoint[] => {
  // minPrice = baseTokenPrice - 5%
  const minPrice = baseTokenPrice * 0.95;

  // maxPrice = baseTokenPrice + 5%
  const maxPrice = baseTokenPrice * 1.05;
  const priceInterval = (maxPrice - minPrice) / POINTS_AMOUNT;

  const shift = getShift(positionSide, baseTokenPrice, strikePrice);

  const data = [];

  for (let price = minPrice; price < maxPrice; price += priceInterval) {
    let profitAndLoss = shift;

    if (isPositionSideLong(positionSide) && price > strikePrice) {
      profitAndLoss += price - strikePrice;
    } else if (!isPositionSideLong(positionSide) && price < strikePrice) {
      profitAndLoss += strikePrice - price;
    } else {
      profitAndLoss = shift;
    }

    data.push({
      x: price,
      y: profitAndLoss,
    });
  }

  return data;
};
