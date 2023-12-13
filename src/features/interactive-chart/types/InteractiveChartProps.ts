import type { ChartPoint } from "./ChartPoint";

export interface InteractiveChartProps {
  chartPoints: ChartPoint[];
  selectedChartPoint: ChartPoint | null;
  setSelectedChartPoint: (chartPoint: ChartPoint | null) => void;
  defaultPointerTitle?: [string, string] | [string];
  defaultPointerX?: number;
  getSelectedPointerTitle?: (
    chartPoint: ChartPoint
  ) => [string, string] | [string];
  minHeight?: number;
}
