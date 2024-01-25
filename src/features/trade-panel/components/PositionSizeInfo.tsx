import { getFormattedTokenAmountWithSymbol } from "../../shared/helpers/formatters";
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
  const { symbol } = tokenData ?? {};

  const formattedPositionSize = getFormattedTokenAmountWithSymbol(
    positionSize,
    symbol
  );

  return (
    <InfoRow>
      <InfoTitle>Position Size</InfoTitle>
      <InfoValue>{formattedPositionSize}</InfoValue>
    </InfoRow>
  );
};
