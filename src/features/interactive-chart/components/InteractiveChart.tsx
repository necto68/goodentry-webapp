import { useCallback } from "react";
import {
  Label,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { theme } from "twin.macro";

import { Container } from "../styles/InteractiveChart";

import { ChartLabel } from "./ChartLabel";
import { ChartTooltip } from "./ChartTooltip";

import type { ChartPoint } from "../types/ChartPoint";
import type { InteractiveChartProps } from "../types/InteractiveChartProps";
import type { FC } from "react";
import type { CategoricalChartState } from "recharts/types/chart/generateCategoricalChart";

export const InteractiveChart: FC<InteractiveChartProps> = ({
  chartPoints,
  selectedChartPoint,
  setSelectedChartPoint,
  defaultPointerTitle,
  defaultPointerX,
  getSelectedPointerTitle,
  minHeight,
}) => {
  const handleMouseMove = useCallback(
    (state: CategoricalChartState) => {
      if (state.activePayload && state.activePayload.length > 0) {
        type ActivePayload = { payload: ChartPoint }[];
        const chartPoint = (state.activePayload as ActivePayload)[0].payload;

        setSelectedChartPoint(chartPoint);
      }
    },
    [setSelectedChartPoint]
  );

  const handleMouseLeave = useCallback(() => {
    setSelectedChartPoint(null);
  }, [setSelectedChartPoint]);

  const brandColor = theme`colors.brand`;
  const whiteColor = theme`colors.text.white`;

  const isShowDefaultPointer = Boolean(selectedChartPoint);

  return (
    <Container minHeight={minHeight}>
      <ResponsiveContainer>
        <LineChart
          data={chartPoints}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <XAxis
            dataKey="x"
            domain={["dataMin", "dataMax"]}
            hide
            type="number"
          />
          <YAxis dataKey="y" domain={["dataMin", "dataMax"]} hide />
          <Tooltip
            content={
              <ChartTooltip getSelectedPointerTitle={getSelectedPointerTitle} />
            }
            isAnimationActive={false}
            position={{ y: 0 }}
          />
          <ReferenceLine
            label={
              <Label
                content={
                  <ChartLabel
                    defaultPointerTitle={defaultPointerTitle}
                    isShow={isShowDefaultPointer}
                  />
                }
                position="insideTop"
              />
            }
            opacity={isShowDefaultPointer ? 0 : 1}
            stroke={whiteColor}
            x={defaultPointerX}
          />
          <ReferenceLine stroke={whiteColor} y={0} />
          <Line dataKey="y" dot={false} stroke={brandColor} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};
