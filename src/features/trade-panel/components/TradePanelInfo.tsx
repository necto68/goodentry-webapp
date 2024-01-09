import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedNumber } from "../../shared/helpers/baseFormatters";
import {
  Container,
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { exerciseFee, minPositionSize } from "../constants/openPosition";
import { getPositionSize } from "../helpers/getPositionSize";
import { useMaxPositionSize } from "../hooks/useMaxPositionSize";
import { useTradePanelState } from "../stores/useTradePanelState";

export const TradePanelInfo = () => {
  const { quoteTokenInputState, selectedLeverage } = useTradePanelState();
  const maxPositionSize = useMaxPositionSize();

  const { tokenData } = quoteTokenInputState;
  const positionSize = getPositionSize(quoteTokenInputState, selectedLeverage);

  const formattedPositionSizeValue = getFormattedNumber(
    positionSize.toNumber()
  );
  const formattedMinPositionSizeValue = getFormattedNumber(minPositionSize);
  const formattedMaxPositionSizeValue = maxPositionSize
    ? getFormattedNumber(maxPositionSize.toNumber())
    : undefined;
  const formattedExerciseFeeValue = getFormattedNumber(exerciseFee);

  const [
    formattedPositionSize,
    formattedMinPositionSize,
    formattedMaxPositionSize,
    formattedExerciseFee,
  ] = [
    formattedPositionSizeValue,
    formattedMinPositionSizeValue,
    formattedMaxPositionSizeValue,
    formattedExerciseFeeValue,
  ].map((formattedValue) =>
    formattedValue && tokenData
      ? `${formattedValue} ${tokenData.symbol}`
      : loadingPlaceholder
  );

  return (
    <Container>
      <InfoRow>
        <InfoTitle>Position Size</InfoTitle>
        <InfoValue>{formattedPositionSize}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Min Position Size</InfoTitle>
        <InfoValue>{formattedMinPositionSize}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Max Position Size</InfoTitle>
        <InfoValue>{formattedMaxPositionSize}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Exercise Fee</InfoTitle>
        <InfoValue>{formattedExerciseFee}</InfoValue>
      </InfoRow>
    </Container>
  );
};
