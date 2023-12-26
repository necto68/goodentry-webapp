import { TabType } from "../../trade-panel/types/TabType";
import { POINTS_AMOUNT } from "../constants/chartPoints";

import type { ChartPoint } from "../../interactive-chart/types/ChartPoint";

export const getShift = (
  selectedTab: TabType,
  baseTokenPrice: number,
  strikePrice: number
) => {
  if (selectedTab === TabType.LONG && strikePrice < baseTokenPrice) {
    return strikePrice - baseTokenPrice;
  }

  if (selectedTab === TabType.SHORT && strikePrice > baseTokenPrice) {
    return baseTokenPrice - strikePrice;
  }

  return 0;
};

export const getChartPoints = (
  selectedTab: TabType,
  baseTokenPrice: number,
  strikePrice: number
): ChartPoint[] => {
  // minPrice = baseTokenPrice - 20%
  const minPrice = baseTokenPrice * 0.8;

  // maxPrice = baseTokenPrice + 20%
  const maxPrice = baseTokenPrice * 1.2;
  const priceInterval = (maxPrice - minPrice) / POINTS_AMOUNT;

  const shift = getShift(selectedTab, baseTokenPrice, strikePrice);

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
