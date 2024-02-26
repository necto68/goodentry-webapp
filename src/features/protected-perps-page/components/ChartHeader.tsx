import {
  loadingPlaceholder,
  notAvailablePlaceholder,
} from "../../shared/constants/placeholders";
import {
  getFormattedAPY,
  getFormattedProfitAndLossPercentage,
} from "../../shared/helpers/baseFormatters";
import {
  getFormattedOpenInterest,
  getFormattedPrice,
} from "../../shared/helpers/formatters";
import { useAssetPrices } from "../hooks/useAssetPrices";
import { usePairOpenInterest } from "../hooks/usePairOpenInterest";
import { usePairPrices } from "../hooks/usePairPrices";
import { usePairIdStore } from "../stores/usePairIdStore";
import {
  Container,
  PriceContainer,
  Title,
  Value,
  ColorValue,
} from "../styles/ChartHeader";
import { ComponentContainer } from "../styles/ProtectedPerpsPage";

import { PairSelector } from "./PairSelector";

export const ChartHeader = () => {
  const { pairId } = usePairIdStore();
  const { baseTokenPrice, volatility } = usePairPrices(pairId) ?? {};
  const { priceChange, highPrice, lowPrice } = useAssetPrices(pairId) ?? {};
  const {
    longOpenInterest,
    shortOpenInterest,
    longMaxOpenInterest,
    shortMaxOpenInterest,
  } = usePairOpenInterest(pairId) ?? {};

  const [formattedBaseTokenPrice, formattedHighPrice, formattedLowPrice] = [
    baseTokenPrice,
    highPrice,
    lowPrice,
  ].map((price) => getFormattedPrice(price));

  let formattedPriceChange = notAvailablePlaceholder;

  if (priceChange === undefined) {
    formattedPriceChange = loadingPlaceholder;
  } else if (priceChange === null) {
    formattedPriceChange = notAvailablePlaceholder;
  } else {
    formattedPriceChange = getFormattedProfitAndLossPercentage(priceChange);
  }

  const isPositive = priceChange ? priceChange > 0 : false;

  const formattedLongOpenInterest = getFormattedOpenInterest(
    longOpenInterest,
    longMaxOpenInterest
  );

  const formattedShortOpenInterest = getFormattedOpenInterest(
    shortOpenInterest,
    shortMaxOpenInterest
  );

  const formattedVolatility = volatility
    ? getFormattedAPY(volatility)
    : loadingPlaceholder;

  return (
    <ComponentContainer>
      <Container>
        <PairSelector />
        <Container>
          <PriceContainer>
            <Title>Current Price</Title>
            <Value>{formattedBaseTokenPrice}</Value>
          </PriceContainer>
          <PriceContainer>
            <Title>24h Change</Title>
            <ColorValue isPositive={isPositive}>
              {formattedPriceChange}
            </ColorValue>
          </PriceContainer>
          <PriceContainer>
            <Title>24h High / Low</Title>
            <Value>{`${formattedHighPrice} / ${formattedLowPrice}`}</Value>
          </PriceContainer>
          <PriceContainer>
            <Title>Open Interest Long / Short</Title>
            <Value>{`${formattedLongOpenInterest} / ${formattedShortOpenInterest}`}</Value>
          </PriceContainer>
          <PriceContainer>
            <Title>Volatility</Title>
            <Value>{formattedVolatility}</Value>
          </PriceContainer>
        </Container>
      </Container>
    </ComponentContainer>
  );
};
