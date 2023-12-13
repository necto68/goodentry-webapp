import { getFormattedAmount } from "../../shared/helpers/baseFormatters";
import {
  getFormattedTickerBorrowRate,
  getFormattedTickerTitle,
} from "../../shared/helpers/formatters";
import {
  Container,
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { EntryPrice } from "../../trade-panel/components/EntryPrice";
import { getTabTitle } from "../../trade-panel/helpers/formatters";
import { useTicker } from "../../trade-panel/hooks/useTicker";
import { useTradeModalState } from "../stores/useTradeModalState";

export const TickerInfo = () => {
  const {
    selectedTab,
    selectedPairId,
    selectedTickerAddress,
    tickerTokenInputState,
  } = useTradeModalState();
  const ticker = useTicker(selectedPairId, selectedTickerAddress);

  const {
    symbol: tickerSymbol = "",
    strikePrice,
    borrowRatePerHour,
  } = ticker ?? {};
  const { tokenData, inputValueBig } = tickerTokenInputState;
  const { symbol = "" } = tokenData ?? {};

  const formattedTickerTitle = getFormattedTickerTitle(
    tickerSymbol,
    strikePrice
  );
  const sideTitle = getTabTitle(selectedTab);
  const formattedSize = getFormattedAmount(inputValueBig);
  const formattedBorrowRate = getFormattedTickerBorrowRate(borrowRatePerHour);

  return (
    <Container>
      <InfoRow>
        <InfoTitle>Instrument</InfoTitle>
        <InfoValue>{formattedTickerTitle}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Side</InfoTitle>
        <InfoValue>{sideTitle}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Size</InfoTitle>
        <InfoValue>{`${formattedSize} ${symbol}`}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Funding / 1h</InfoTitle>
        <InfoValue>{formattedBorrowRate}</InfoValue>
      </InfoRow>
      <EntryPrice
        selectedPairId={selectedPairId}
        selectedTab={selectedTab}
        selectedTickerAddress={selectedTickerAddress}
      />
    </Container>
  );
};
