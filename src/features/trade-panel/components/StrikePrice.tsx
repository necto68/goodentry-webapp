import { InputContainer, InputTitle } from "../../input-card/styles/InputCard";
import { useOptionBorrowRates } from "../../protected-perps-page/hooks/useOptionBorrowRates";
import { usePairPrices } from "../../protected-perps-page/hooks/usePairPrices";
import {
  getFormattedBorrowRate,
  getFormattedPrice,
} from "../../shared/helpers/formatters";
import { useTradePanelState } from "../stores/useTradePanelState";
import { Container, Content, Value } from "../styles/StrikePrice";
import { TabType } from "../types/TabType";

export const StrikePrice = () => {
  const { selectedTab } = useTradePanelState();
  const { lowerStrikePrice, upperStrikePrice } = usePairPrices() ?? {};
  const { lowerOptionBorrowRate, upperOptionBorrowRate } =
    useOptionBorrowRates() ?? {};

  const isLongTab = selectedTab === TabType.LONG;

  const strikePrice = isLongTab ? upperStrikePrice : lowerStrikePrice;
  const optionBorrowRate = isLongTab
    ? upperOptionBorrowRate
    : lowerOptionBorrowRate;

  const formattedStrikePrice = getFormattedPrice(strikePrice);
  const formattedBorrowRate = getFormattedBorrowRate(optionBorrowRate);

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
