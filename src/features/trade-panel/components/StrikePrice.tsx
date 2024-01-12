import { InputContainer, InputTitle } from "../../input-card/styles/InputCard";
import {
  getFormattedBorrowRate,
  getFormattedPrice,
} from "../../shared/helpers/formatters";
import { useTradePanelOptionHourlyBorrowRate } from "../hooks/useTradePanelOptionHourlyBorrowRate";
import { useTradePanelStrikePrice } from "../hooks/useTradePanelStrikePrice";
import { useTradePanelState } from "../stores/useTradePanelState";
import { Container, Content, Value } from "../styles/StrikePrice";

export const StrikePrice = () => {
  const {
    selectedTab,
    selectedPairId,
    quoteTokenInputState,
    selectedLeverage,
  } = useTradePanelState();

  const strikePrice = useTradePanelStrikePrice(selectedTab, selectedPairId);
  const optionHourlyBorrowRate = useTradePanelOptionHourlyBorrowRate(
    selectedTab,
    selectedPairId,
    quoteTokenInputState,
    selectedLeverage
  );

  const formattedStrikePrice = getFormattedPrice(strikePrice);
  const formattedHourlyBorrowRate = getFormattedBorrowRate(
    optionHourlyBorrowRate
  );

  return (
    <InputContainer>
      <Content>
        <InputTitle>Activation Price</InputTitle>
        <InputTitle>Funding / 1h</InputTitle>
      </Content>
      <Container>
        <Content>
          <Value>{formattedStrikePrice}</Value>
          <Value>{formattedHourlyBorrowRate}</Value>
        </Content>
      </Container>
    </InputContainer>
  );
};
