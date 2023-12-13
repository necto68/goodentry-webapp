import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getZero } from "../../shared/helpers/bigjs";
import {
  getMarginUsage,
  getFormattedMarginUsage,
} from "../../shared/helpers/formatters";
import {
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { useLendingPool } from "../hooks/useLendingPool";
import { useGeWalletState } from "../stores/useGeWalletState";
import { useIsGeWalletInfoLoadingStore } from "../stores/useIsGeWalletInfoLoadingStore";

import { FutureInfoValues } from "./FutureInfoValues";

import type Big from "big.js";
import type { FC } from "react";

interface MarginUsageInfoProps {
  readonly additionalTotalCollateral?: Big;
  readonly additionalTotalDebt?: Big;
}

// eslint-disable-next-line complexity
export const MarginUsageInfo: FC<MarginUsageInfoProps> = ({
  additionalTotalCollateral = getZero(),
  additionalTotalDebt = getZero(),
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const { isGeWalletInfoLoading } = useIsGeWalletInfoLoadingStore();

  const { pairId, lendingPoolAddress } = useGeWalletState();
  const lendingPool = useLendingPool(pairId, lendingPoolAddress);

  const { totalCollateral, totalDebt, liquidationThreshold } =
    lendingPool ?? {};

  const futureTotalCollateral = totalCollateral?.add(additionalTotalCollateral);
  const futureTotalDebt = totalDebt?.add(additionalTotalDebt);

  const marginUsage = getMarginUsage(
    totalCollateral ?? getZero(),
    totalDebt ?? getZero(),
    liquidationThreshold ?? 0
  );

  const futureMarginUsage = getMarginUsage(
    futureTotalCollateral ?? getZero(),
    futureTotalDebt ?? getZero(),
    liquidationThreshold ?? 0
  );

  const formattedMarginUsage = getFormattedMarginUsage(
    totalCollateral,
    totalDebt,
    liquidationThreshold
  );

  const formattedFutureMarginUsage = getFormattedMarginUsage(
    futureTotalCollateral,
    futureTotalDebt,
    liquidationThreshold,
    true
  );

  const isShowFutureValues =
    !additionalTotalCollateral.eq(getZero()) ||
    !additionalTotalDebt.eq(getZero());

  const isPositive = futureMarginUsage.lt(marginUsage);

  let valueComponent = null;

  if (isGeWalletInfoLoading) {
    valueComponent = <InfoValue>{loadingPlaceholder}</InfoValue>;
  } else if (isShowFutureValues) {
    valueComponent = (
      <FutureInfoValues
        currentValue={formattedMarginUsage}
        futureValue={formattedFutureMarginUsage}
        isPositive={isPositive}
      />
    );
  } else {
    valueComponent = <InfoValue>{formattedMarginUsage}</InfoValue>;
  }

  return (
    <InfoRow>
      <InfoTitle>Margin Usage</InfoTitle>
      {valueComponent}
    </InfoRow>
  );
};
