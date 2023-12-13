import { useState } from "react";

import { useLockToken } from "../../lock-page/hooks/useLockToken";
import { Title, Value } from "../../protected-perps-page/styles/PayoffChart";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedAmount } from "../../shared/helpers/baseFormatters";
import { toBig } from "../../shared/helpers/bigjs";
import { InfoRow } from "../../shared/modal/styles/ModalInfo";
import { useLockWithdrawModalState } from "../stores/useLockWithdrawModalState";
import { Container } from "../styles/UnlockChart";

import { UnlockInteractiveChart } from "./UnlockInteractiveChart";

import type { ChartPoint } from "../../interactive-chart/types/ChartPoint";

export const UnlockChart = () => {
  const { selectedUnlockSchedule } = useLockWithdrawModalState();
  const { governanceTokenUnlocked } = selectedUnlockSchedule ?? {};
  const { symbol } = useLockToken() ?? {};

  const [selectedChartPoint, setSelectedChartPoint] =
    useState<ChartPoint | null>(null);

  const formattedSelectedUnlockValue = selectedChartPoint
    ? getFormattedAmount(toBig(selectedChartPoint.y))
    : null;

  const formattedDefaultUnlockValue = governanceTokenUnlocked
    ? getFormattedAmount(governanceTokenUnlocked)
    : null;

  const [formattedSelectedUnlock, formattedDefaultUnlock] = [
    formattedSelectedUnlockValue,
    formattedDefaultUnlockValue,
  ].map((value) => (value && symbol ? `${value} ${symbol}` : null));

  const formattedUnlock =
    formattedSelectedUnlock ?? formattedDefaultUnlock ?? loadingPlaceholder;

  return (
    <Container>
      <InfoRow>
        <Title>Estimated Unlocked</Title>
        <Value>{formattedUnlock}</Value>
      </InfoRow>
      <UnlockInteractiveChart
        selectedChartPoint={selectedChartPoint}
        setSelectedChartPoint={setSelectedChartPoint}
      />
    </Container>
  );
};
