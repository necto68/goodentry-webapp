import { useState } from "react";

import { useLockToken } from "../../lock-page/hooks/useLockToken";
import { Title, Value } from "../../protected-perps-page/styles/PayoffChart";
import { toBig } from "../../shared/helpers/bigjs";
import { getFormattedTokenAmountWithSymbol } from "../../shared/helpers/formatters";
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

  const unlockValue = selectedChartPoint
    ? toBig(selectedChartPoint.y)
    : governanceTokenUnlocked;

  const formattedUnlock = getFormattedTokenAmountWithSymbol(
    unlockValue,
    symbol
  );

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
