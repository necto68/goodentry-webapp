import {
  loadingPlaceholder,
  notAvailablePlaceholder,
} from "../../shared/constants/placeholders";
import { getFormattedAPY } from "../../shared/helpers/baseFormatters";
import { getFormattedCurrentPrice } from "../../shared/helpers/formatters";
import { useAssetPrices } from "../hooks/useAssetPrices";
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
  const assetPrices = useAssetPrices();

  const { currentPrice, priceChange, highPrice, lowPrice } = assetPrices ?? {};

  const [formattedCurrentPrice, formattedHighPrice, formattedLowPrice] = [
    currentPrice,
    highPrice,
    lowPrice,
  ].map((price) => getFormattedCurrentPrice(price));

  let formattedPriceChange = notAvailablePlaceholder;

  if (priceChange === undefined) {
    formattedPriceChange = loadingPlaceholder;
  } else if (priceChange === null) {
    formattedPriceChange = notAvailablePlaceholder;
  } else {
    formattedPriceChange = getFormattedAPY(priceChange);
  }

  const isPositive = priceChange ? priceChange > 0 : false;

  return (
    <ComponentContainer>
      <Container>
        <PairSelector />
        <Container>
          <PriceContainer>
            <Title>Current Price</Title>
            <Value>{formattedCurrentPrice}</Value>
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
