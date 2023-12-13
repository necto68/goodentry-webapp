import { useState } from "react";

import { notAvailablePlaceholder } from "../../shared/constants/placeholders";
import { getFormattedAPY } from "../../shared/helpers/baseFormatters";
import { InfoRow } from "../../shared/modal/styles/ModalInfo";
import { useTicker } from "../../trade-panel/hooks/useTicker";
import { useTradePanelState } from "../../trade-panel/stores/useTradePanelState";
import { Container, Title, ColorValue, Value } from "../styles/PayoffChart";

import { PayoffChartInfo } from "./PayoffChartInfo";
import { PayoffInteractiveChart } from "./PayoffInteractiveChart";

import type { ChartPoint } from "../../interactive-chart/types/ChartPoint";

export const PayoffChart = () => {
  const { selectedPairId, selectedTickerAddress } = useTradePanelState();

  const { strikePrice } =
    useTicker(selectedPairId, selectedTickerAddress) ?? {};

  const [selectedChartPoint, setSelectedChartPoint] =
    useState<ChartPoint | null>(null);

  const profitAndLossChartValue =
    selectedChartPoint && strikePrice
      ? selectedChartPoint.y / strikePrice
      : null;

  const formattedProfitAndLossChartValue =
    profitAndLossChartValue !== null
      ? getFormattedAPY(profitAndLossChartValue)
      : null;

  const profitAndLossChartValuePrefix =
    profitAndLossChartValue && profitAndLossChartValue > 0 ? "+" : "";

  return (
    <Container>
      <InfoRow>
        <Title>Payoff Chart (Excluding Funding)</Title>
        {profitAndLossChartValue !== null &&
        formattedProfitAndLossChartValue !== null ? (
          <ColorValue isPositive={profitAndLossChartValue > 0}>
            {`${profitAndLossChartValuePrefix}${formattedProfitAndLossChartValue}`}
          </ColorValue>
        ) : (
          <Value>{notAvailablePlaceholder}</Value>
        )}
      </InfoRow>
      <PayoffInteractiveChart
        selectedChartPoint={selectedChartPoint}
        setSelectedChartPoint={setSelectedChartPoint}
      />
      <PayoffChartInfo />
    </Container>
  );
};
