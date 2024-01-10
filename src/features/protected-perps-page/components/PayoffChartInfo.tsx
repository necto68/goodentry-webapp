import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedPrice } from "../../shared/helpers/formatters";
import {
  Container,
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { useTradePanelStrikePrice } from "../../trade-panel/hooks/useTradePanelStrikePrice";

export const PayoffChartInfo = () => {
  const strikePrice = useTradePanelStrikePrice();

  const formattedEntryPrice = strikePrice
    ? getFormattedPrice(strikePrice)
    : loadingPlaceholder;

  return (
    <Container>
      <InfoRow>
        <InfoTitle>Max Profit</InfoTitle>
        <InfoValue>Infinity</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Entry Price (Break-Even)</InfoTitle>
        <InfoValue>{formattedEntryPrice}</InfoValue>
      </InfoRow>
    </Container>
  );
};
