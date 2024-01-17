import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedAmount } from "../../shared/helpers/baseFormatters";
import {
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { getPositionSize } from "../helpers/getPositionSize";

import type { TradePanelState } from "../types/TradePanelState";
import type { FC } from "react";

type PositionSizeInfoProps = Pick<
  TradePanelState,
  "leverage" | "quoteTokenInputState"
>;

export const PositionSizeInfo: FC<PositionSizeInfoProps> = ({
  quoteTokenInputState,
  leverage,
}) => {
  const positionSize = getPositionSize(quoteTokenInputState, leverage);

  const { tokenData } = quoteTokenInputState;

  const formattedPositionSizeValue = getFormattedAmount(positionSize);
  const formattedPositionSize = tokenData
    ? `${formattedPositionSizeValue} ${tokenData.symbol}`
    : loadingPlaceholder;

  return (
    <InfoRow>
      <InfoTitle>Position Size</InfoTitle>
      <InfoValue>{formattedPositionSize}</InfoValue>
    </InfoRow>
  );
};
