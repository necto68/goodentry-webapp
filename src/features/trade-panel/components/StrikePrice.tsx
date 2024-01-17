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
  const { positionSide, pairId, quoteTokenInputState, leverage } =
    useTradePanelState();

  const strikePrice = useTradePanelStrikePrice(positionSide, pairId);
  const optionHourlyBorrowRate = useTradePanelOptionHourlyBorrowRate(
    positionSide,
    pairId,
    quoteTokenInputState,
    leverage
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
