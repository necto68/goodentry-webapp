import { TabType } from "../../trade-panel/types/TabType";
import { POINTS_AMOUNT } from "../constants/chartPoints";

import type { ChartPoint } from "../../interactive-chart/types/ChartPoint";

export const getShift = (
  selectedTab: TabType,
  currentPrice: number,
  strikePrice: number
) => {
  if (selectedTab === TabType.LONG && strikePrice < currentPrice) {
    return strikePrice - currentPrice;
  }

  if (selectedTab === TabType.SHORT && strikePrice > currentPrice) {
    return currentPrice - strikePrice;
  }

  return 0;
};

export const getChartPoints = (
  selectedTab: TabType,
  currentPrice: number,
  strikePrice: number
): ChartPoint[] => {
  // minPrice = currentPrice - 20%
  const minPrice = currentPrice * 0.8;

  // maxPrice = currentPrice + 20%
  const maxPrice = currentPrice * 1.2;
  const priceInterval = (maxPrice - minPrice) / POINTS_AMOUNT;

  const shift = getShift(selectedTab, currentPrice, strikePrice);

  const data = [];

  for (let price = minPrice; price < maxPrice; price += priceInterval) {
    let profitAndLossValue = shift;

    if (selectedTab === TabType.LONG && price > strikePrice) {
      profitAndLossValue += price - strikePrice;
    } else if (selectedTab === TabType.SHORT && price < strikePrice) {
      profitAndLossValue += strikePrice - price;
    } else {
      profitAndLossValue = shift;
    }

    data.push({
      x: price,
      y: profitAndLossValue,
    });
  }

  return data;
};
