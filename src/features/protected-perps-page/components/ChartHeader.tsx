import {
  loadingPlaceholder,
  notAvailablePlaceholder,
} from "../../shared/constants/placeholders";
import { getFormattedAPY } from "../../shared/helpers/baseFormatters";
import { getFormattedPrice } from "../../shared/helpers/formatters";
import { useAssetPrices } from "../hooks/useAssetPrices";
import { usePairPrices } from "../hooks/usePairPrices";
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
  const { baseTokenPrice } = usePairPrices() ?? {};
  const { priceChange, highPrice, lowPrice } = useAssetPrices() ?? {};

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
    formattedPriceChange = getFormattedAPY(priceChange, {
      signDisplay: "exceptZero",
    });
  }

  const isPositive = priceChange ? priceChange > 0 : false;

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
            <Title>24h High</Title>
            <Value>{formattedHighPrice}</Value>
          </PriceContainer>
          <PriceContainer>
            <Title>24h Low</Title>
            <Value>{formattedLowPrice}</Value>
          </PriceContainer>
        </Container>
      </Container>
    </ComponentContainer>
  );
};
