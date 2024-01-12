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

interface PositionSizeInfoProps {
  readonly quoteTokenInputState: TradePanelState["quoteTokenInputState"];
  readonly selectedLeverage: TradePanelState["selectedLeverage"];
}

export const PositionSizeInfo: FC<PositionSizeInfoProps> = ({
  quoteTokenInputState,
  selectedLeverage,
}) => {
  const positionSize = getPositionSize(quoteTokenInputState, selectedLeverage);

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
