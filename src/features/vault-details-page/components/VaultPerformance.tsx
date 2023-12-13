import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { VaultChart } from "../../asset-chart/components/VaultChart";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedAPY } from "../../shared/helpers/baseFormatters";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { useVaultApiData } from "../../vault/hooks/useVaultsApi";
import { VaultStatus } from "../../vault/types/VaultStatus";
import { useVault } from "../hooks/useVault";
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

import type { VaultHistory } from "../../vault/hooks/useVaultsApi";

export const VaultPerformance = () => {
  const [apyData, setApyData] = useState<VaultHistory[]>([]);

  const { vaultId = "" } = useParams();

  const { id, status } = getVaultConfig(vaultId);

  const isActiveVault = status === VaultStatus.ACTIVE;

  const {
    address = "",
    supplyRate,
    feesRate,
    totalAnnualPercentageYield,
  } = useVault(id) ?? {};

  const [
    formattedSupplyRate,
    formattedFeesRate,
    formattedTotalAnnualPercentageYield,
  ] = [supplyRate, feesRate, totalAnnualPercentageYield].map((value) =>
    value ? getFormattedAPY(value) : loadingPlaceholder
  );

  const { getHistory } = useVaultApiData();

  useEffect(() => {
    if (apyData.length === 0) {
      const fetchApyData = async () => {
        const data = await getHistory();

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        setApyData(data[address] ?? []);
      };

      void fetchApyData();
    }
  }, [address, getHistory, setApyData, apyData]);

  return (
    <Container>
      <APRRow>
        <Metric>
          <Title>Total Projected APR</Title>
          <AccentValue>{formattedTotalAnnualPercentageYield}</AccentValue>
        </Metric>
      </APRRow>
      <VaultChart
        data={apyData.map(
          (record) =>
            Number(record.supplyRate) + (isActiveVault ? record.feesRate : 0)
        )}
      />
      <MetricsRow>
        <Metric>
          <MetricTitle>V3 Fees (7d Annualized)</MetricTitle>
          <MetricValue>{formattedFeesRate}</MetricValue>
        </Metric>
        <Metric>
          <MetricTitle>Supply Interest</MetricTitle>
          <MetricValue>{formattedSupplyRate}</MetricValue>
        </Metric>
      </MetricsRow>
    </Container>
  );
};
