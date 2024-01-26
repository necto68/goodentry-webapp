import React from "react";
import { useParams } from "react-router-dom";

import { VaultChart } from "../../asset-chart/components/VaultChart";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedAPY } from "../../shared/helpers/baseFormatters";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { VaultStatus } from "../../vault/types/VaultStatus";
import { useVaultApiData } from "../hooks/useVaultApiData";
import {
  AccentValue,
  APRRow,
  Container,
  Metric,
  MetricsRow,
  MetricTitle,
  MetricValue,
  Title,
} from "../styles/VaultPerformance";

export const VaultPerformance = () => {
  const { vaultId = "" } = useParams();

  const { status } = getVaultConfig(vaultId);

  const {
    feesAnnualPercentageRate,
    rewardsAnnualPercentageRate,
    totalAnnualPercentageRate,
    annualPercentageRateHistory,
  } = useVaultApiData(vaultId) ?? {};

  const [formattedFeesAPR, formattedRewardsAPR, formattedTotalAPR] = [
    feesAnnualPercentageRate,
    rewardsAnnualPercentageRate,
    totalAnnualPercentageRate,
  ].map((value) => (value ? getFormattedAPY(value) : loadingPlaceholder));

  const historyData = annualPercentageRateHistory
    ? annualPercentageRateHistory.map(({ value }) => value)
    : null;

  return (
    <Container>
      <APRRow>
        <Metric>
          <Title>Total Projected APR</Title>
          <AccentValue>{formattedTotalAPR}</AccentValue>
        </Metric>
      </APRRow>
      {historyData ? <VaultChart data={historyData} /> : null}
      <MetricsRow>
        <Metric>
          <MetricTitle>Fees APR</MetricTitle>
          <MetricValue>{formattedFeesAPR}</MetricValue>
        </Metric>
        {status === VaultStatus.ACTIVE_REWARDS ? (
          <Metric>
            <MetricTitle>Rewards APR</MetricTitle>
            <MetricValue>{formattedRewardsAPR}</MetricValue>
          </Metric>
        ) : null}
      </MetricsRow>
    </Container>
  );
};
