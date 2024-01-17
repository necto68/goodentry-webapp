import { loadingPlaceholder } from "../../shared/constants/placeholders";
import {
  getFormattedAmount,
  getFormattedLeverage,
} from "../../shared/helpers/baseFormatters";
import {
  Container,
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { PositionSizeInfo } from "../../trade-panel/components/PositionSizeInfo";
import { useOpenPositionModalState } from "../stores/useOpenPositionModalState";

export const PositionInfo = () => {
  const { quoteTokenInputState, selectedLeverage } =
    useOpenPositionModalState();

  const { tokenData, inputValueBig } = quoteTokenInputState;

  const formattedQuoteTokenAmountValue = getFormattedAmount(inputValueBig);
  const formattedLeverage = getFormattedLeverage(selectedLeverage);

  const formattedQuoteTokenAmount = tokenData
    ? `${formattedQuoteTokenAmountValue} ${tokenData.symbol}`
    : loadingPlaceholder;

  return (
    <Container>
      <InfoRow>
        <InfoTitle>Wager</InfoTitle>
        <InfoValue>{formattedQuoteTokenAmount}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Leverage</InfoTitle>
        <InfoValue>{formattedLeverage}</InfoValue>
      </InfoRow>
      <PositionSizeInfo
        quoteTokenInputState={quoteTokenInputState}
        selectedLeverage={selectedLeverage}
      />
    </Container>
  );
};
