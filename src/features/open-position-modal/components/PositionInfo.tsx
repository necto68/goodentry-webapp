import { getFormattedLeverage } from "../../shared/helpers/baseFormatters";
import { getFormattedTokenAmountWithSymbol } from "../../shared/helpers/formatters";
import {
  Container,
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { PositionSizeInfo } from "../../trade-panel/components/PositionSizeInfo";
import { useOpenPositionModalState } from "../stores/useOpenPositionModalState";

export const PositionInfo = () => {
  const { quoteTokenInputState, leverage } = useOpenPositionModalState();

  const { tokenData, inputValueBig } = quoteTokenInputState;
  const { symbol } = tokenData ?? {};

  const formattedQuoteTokenAmount = getFormattedTokenAmountWithSymbol(
    inputValueBig,
    symbol
  );

  const formattedLeverage = getFormattedLeverage(leverage);

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
        leverage={leverage}
        quoteTokenInputState={quoteTokenInputState}
      />
    </Container>
  );
};
