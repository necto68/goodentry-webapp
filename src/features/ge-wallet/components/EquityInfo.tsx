import { getZero } from "../../shared/helpers/bigjs";
import { getFormattedEquity } from "../../shared/helpers/formatters";
import {
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { useLendingPool } from "../hooks/useLendingPool";
import { useGeWalletState } from "../stores/useGeWalletState";

import { FutureInfoValues } from "./FutureInfoValues";

import type Big from "big.js";
import type { FC } from "react";

interface EquityInfoProps {
  readonly additionalTotalCollateral?: Big;
}

export const EquityInfo: FC<EquityInfoProps> = ({
  additionalTotalCollateral = getZero(),
}) => {
  const { pairId, lendingPoolAddress } = useGeWalletState();
  const lendingPool = useLendingPool(pairId, lendingPoolAddress);

  const { totalCollateral } = lendingPool ?? {};

  const formattedEquity = getFormattedEquity(totalCollateral);
  const formattedFutureEquity = getFormattedEquity(
    totalCollateral?.add(additionalTotalCollateral)
  );

  const isShowFutureValues = !additionalTotalCollateral.eq(getZero());
  const isPositive = additionalTotalCollateral.gt(getZero());

  return (
    <InfoRow>
      <InfoTitle>Equity</InfoTitle>
      {isShowFutureValues ? (
        <FutureInfoValues
          currentValue={formattedEquity}
          futureValue={formattedFutureEquity}
          isPositive={isPositive}
        />
      ) : (
        <InfoValue>{formattedEquity}</InfoValue>
      )}
    </InfoRow>
  );
};
