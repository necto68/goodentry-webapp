import { theme } from "twin.macro";

import type { InteractiveChartProps } from "../types/InteractiveChartProps";
import type { FC } from "react";
import type { LabelProps } from "recharts";

const grayColor = theme`colors.text.gray`;

interface PriceLabelProps
  extends LabelProps,
    Pick<InteractiveChartProps, "defaultPointerTitle"> {
  readonly isShow: boolean;
}

export const ChartLabel: FC<PriceLabelProps> = ({
  defaultPointerTitle,
  viewBox,
  isShow,
}) => {
  const x = viewBox && "x" in viewBox ? viewBox.x : 0;

  const xShift = 5;
  const yShift = 10;
  const fontSize = 12;
  const gap = 6;

  const [title0, title1] = defaultPointerTitle ?? [];

  return (
    <g fill={grayColor} fontSize={12} opacity={isShow ? 0 : 1}>
      {title0 ? (
        <text dx={xShift} x={x} y={yShift}>
          {title0}
        </text>
      ) : null}
      {title1 ? (
        <text dx={xShift} dy={fontSize + gap} x={x} y={yShift}>
          {title1}
        </text>
      ) : null}
    </g>
  );
};
