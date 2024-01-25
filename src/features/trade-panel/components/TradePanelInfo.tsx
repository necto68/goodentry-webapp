import { toBig } from "../../shared/helpers/bigjs";
import { getFormattedTokenAmountWithSymbol } from "../../shared/helpers/formatters";
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
  const { quoteTokenInputState, leverage } = useTradePanelState();
  const maxPositionSize = useMaxPositionSize();

  const { tokenData } = quoteTokenInputState;
  const { symbol } = tokenData ?? {};

  const [formattedMinPositionSize, formattedMaxPositionSize] = [
    toBig(minPositionSize),
    maxPositionSize,
  ].map((value) => getFormattedTokenAmountWithSymbol(value, symbol));

  return (
    <Container>
      <PositionSizeInfo
        leverage={leverage}
        quoteTokenInputState={quoteTokenInputState}
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
