import { InputContainer, InputTitle } from "../../input-card/styles/InputCard";
import { usePairPrices } from "../../protected-perps-page/hooks/usePairPrices";
import { getFormattedPrice } from "../../shared/helpers/formatters";
import { useTradePanelState } from "../stores/useTradePanelState";
import { Container, Content, Value } from "../styles/StrikePrice";
import { TabType } from "../types/TabType";

export const StrikePrice = () => {
  const { selectedTab } = useTradePanelState();
  const { lowerStrikePrice, upperStrikePrice } = usePairPrices() ?? {};

  const isLongTab = selectedTab === TabType.LONG;

  const strikePrice = isLongTab ? upperStrikePrice : lowerStrikePrice;

  const formattedStrikePrice = getFormattedPrice(strikePrice);
  const formattedBorrowRate = "0.5%";

  return (
    <InputContainer>
      <Content>
        <InputTitle>Activation Price</InputTitle>
        <InputTitle>Funding / 1h</InputTitle>
      </Content>
      <Container>
        <Content>
          <Value>{formattedStrikePrice}</Value>
          <Value>{formattedBorrowRate}</Value>
        </Content>
      </Container>
    </InputContainer>
  );
};
