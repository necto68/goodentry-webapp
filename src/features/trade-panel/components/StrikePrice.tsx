import { InputContainer, InputTitle } from "../../input-card/styles/InputCard";
import { useOptionBorrowRates } from "../../protected-perps-page/hooks/useOptionBorrowRates";
import {
  getFormattedBorrowRate,
  getFormattedPrice,
} from "../../shared/helpers/formatters";
import { getPositionSize } from "../helpers/getPositionSize";
import { useTradePanelStrikePrice } from "../hooks/useTradePanelStrikePrice";
import { useTradePanelState } from "../stores/useTradePanelState";
import { Container, Content, Value } from "../styles/StrikePrice";
import { TabType } from "../types/TabType";

export const StrikePrice = () => {
  const {
    selectedTab,
    selectedPairId,
    quoteTokenInputState,
    selectedLeverage,
  } = useTradePanelState();

  const strikePrice = useTradePanelStrikePrice();

  const positionSize = getPositionSize(quoteTokenInputState, selectedLeverage);

  const { lowerOptionHourlyBorrowRate, upperOptionHourlyBorrowRate } =
    useOptionBorrowRates(selectedPairId, positionSize, selectedLeverage) ?? {};

  const isLongTab = selectedTab === TabType.LONG;

  const optionHourlyBorrowRate = isLongTab
    ? upperOptionHourlyBorrowRate
    : lowerOptionHourlyBorrowRate;

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
