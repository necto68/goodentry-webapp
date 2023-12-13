import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getZero } from "../../shared/helpers/bigjs";
import { getFormattedAvailableMargin } from "../../shared/helpers/formatters";
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

interface AvailableMarginInfoProps {
  readonly additionalAvailableMargin?: Big;
}

export const AvailableMarginInfo: FC<AvailableMarginInfoProps> = ({
  additionalAvailableMargin = getZero(),
}) => {
  const { isGeWalletInfoLoading } = useIsGeWalletInfoLoadingStore();

  const { pairId, lendingPoolAddress } = useGeWalletState();
  const lendingPool = useLendingPool(pairId, lendingPoolAddress);

  const { availableCollateral, maxLeverage, loanToValue } = lendingPool ?? {};

  const futureAvailableCollateral =
    availableCollateral && loanToValue && maxLeverage
      ? availableCollateral.add(
          additionalAvailableMargin.div(maxLeverage).mul(loanToValue)
        )
      : null;

  const formattedAvailableMargin = getFormattedAvailableMargin(
    availableCollateral,
    maxLeverage
  );

  const formattedFutureAvailableMargin = getFormattedAvailableMargin(
    futureAvailableCollateral,
    maxLeverage,
    true
  );

  const isShowFutureValues = !additionalAvailableMargin.eq(getZero());
  const isPositive =
    futureAvailableCollateral && availableCollateral
      ? futureAvailableCollateral.gt(availableCollateral)
      : false;

  let valueComponent = null;

  if (isGeWalletInfoLoading) {
    valueComponent = <InfoValue>{loadingPlaceholder}</InfoValue>;
  } else if (isShowFutureValues) {
    valueComponent = (
      <FutureInfoValues
        currentValue={formattedAvailableMargin}
        futureValue={formattedFutureAvailableMargin}
        isPositive={isPositive}
      />
    );
  } else {
    valueComponent = <InfoValue>{formattedAvailableMargin}</InfoValue>;
  }

  return (
    <InfoRow>
      <InfoTitle>Available Margin</InfoTitle>
      {valueComponent}
    </InfoRow>
  );
};
