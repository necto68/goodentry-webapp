import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedAmount } from "../../shared/helpers/baseFormatters";
import { toBig } from "../../shared/helpers/bigjs";
import {
  Container,
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { minPositionSize } from "../constants/openPosition";
import { useMaxPositionSize } from "../hooks/useMaxPositionSize";
import { useTradePanelState } from "../stores/useTradePanelState";

import { ExerciseFeeInfo } from "./ExerciseFeeInfo";
import { PositionSizeInfo } from "./PositionSizeInfo";

export const TradePanelInfo = () => {
  const { quoteTokenInputState, selectedLeverage } = useTradePanelState();
  const maxPositionSize = useMaxPositionSize();

  const { tokenData } = quoteTokenInputState;

  const formattedMinPositionSizeValue = getFormattedAmount(
    toBig(minPositionSize)
  );
  const formattedMaxPositionSizeValue = maxPositionSize
    ? getFormattedAmount(maxPositionSize)
    : undefined;

  const [formattedMinPositionSize, formattedMaxPositionSize] = [
    formattedMinPositionSizeValue,
    formattedMaxPositionSizeValue,
  ].map((formattedValue) =>
    formattedValue && tokenData
      ? `${formattedValue} ${tokenData.symbol}`
      : loadingPlaceholder
  );

  return (
    <Container>
      <PositionSizeInfo
        quoteTokenInputState={quoteTokenInputState}
        selectedLeverage={selectedLeverage}
      />
      <InfoRow>
        <InfoTitle>Min Position Size</InfoTitle>
        <InfoValue>{formattedMinPositionSize}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Max Position Size</InfoTitle>
        <InfoValue>{formattedMaxPositionSize}</InfoValue>
      </InfoRow>
      <ExerciseFeeInfo quoteTokenInputState={quoteTokenInputState} />
    </Container>
  );
};
