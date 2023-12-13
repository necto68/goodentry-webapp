import { AdvancedRealTimeChart as BaseAdvancedRealTimeChart } from "react-ts-tradingview-widgets";

import type { FC } from "react";
import type { AdvancedRealTimeChartProps as BaseAdvancedRealTimeChartProps } from "react-ts-tradingview-widgets";

interface AdvancedRealTimeChartProps extends BaseAdvancedRealTimeChartProps {
  backgroundColor?: string;
}
export const AdvancedRealTimeChart =
  BaseAdvancedRealTimeChart as FC<AdvancedRealTimeChartProps>;
