import {
  Container,
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { EntryPrice } from "../../trade-panel/components/EntryPrice";
import { useTradePanelState } from "../../trade-panel/stores/useTradePanelState";

export const PayoffChartInfo = () => {
  const { selectedTab, selectedPairId } = useTradePanelState();

  // const formattedTickerStrikePrice =
  // getFormattedTickerStrikePrice(strikePrice);

  return (
    <Container>
      <InfoRow>
        <InfoTitle>Max Profit</InfoTitle>
        <InfoValue>Infinity</InfoValue>
      </InfoRow>
      <EntryPrice selectedPairId={selectedPairId} selectedTab={selectedTab} />
      <InfoRow>
        <InfoTitle>Max Loss Price</InfoTitle>
        <InfoValue>formattedTickerStrikePrice</InfoValue>
      </InfoRow>
    </Container>
  );
};
