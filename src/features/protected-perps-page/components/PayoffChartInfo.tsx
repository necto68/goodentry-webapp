import { getFormattedPrice } from "../../shared/helpers/formatters";
import {
  Container,
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { useTradePanelStrikePrice } from "../../trade-panel/hooks/useTradePanelStrikePrice";
import { useTradePanelState } from "../../trade-panel/stores/useTradePanelState";

export const PayoffChartInfo = () => {
  const { selectedTab, selectedPairId } = useTradePanelState();
  const strikePrice = useTradePanelStrikePrice(selectedTab, selectedPairId);

  const formattedEntryPrice = getFormattedPrice(strikePrice);

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
