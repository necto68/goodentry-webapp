import { useState } from "react";

import {
  ColorValue,
  Container,
  Title,
  Value,
} from "../../protected-perps-page/styles/PayoffChart";
import { notAvailablePlaceholder } from "../../shared/constants/placeholders";
import { getFormattedAPY } from "../../shared/helpers/baseFormatters";
import {
  Container as InfoContainer,
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { LOCK_PERIOD_DAYS_AMOUNT } from "../constants/penaltyChartPoints";

import { PenaltyInteractiveChart } from "./PenaltyInteractiveChart";

import type { ChartPoint } from "../../interactive-chart/types/ChartPoint";

export const PenaltyChart = () => {
  const [selectedChartPoint, setSelectedChartPoint] =
    useState<ChartPoint | null>(null);

  const formattedPenalty = selectedChartPoint
    ? getFormattedAPY(-selectedChartPoint.y)
    : null;

  return (
    <Container>
      <InfoRow>
        <Title>Withdraw Penalty</Title>
        {formattedPenalty ? (
          <ColorValue isPositive={false}>{formattedPenalty}</ColorValue>
        ) : (
          <Value>{notAvailablePlaceholder}</Value>
        )}
      </InfoRow>
      <PenaltyInteractiveChart
        selectedChartPoint={selectedChartPoint}
        setSelectedChartPoint={setSelectedChartPoint}
      />
      <InfoContainer>
        <InfoRow>
          <InfoTitle>Number of Days</InfoTitle>
          <InfoValue>{LOCK_PERIOD_DAYS_AMOUNT}</InfoValue>
        </InfoRow>
      </InfoContainer>
    </Container>
  );
};
