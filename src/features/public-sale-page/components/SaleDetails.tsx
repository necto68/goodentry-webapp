import { loadingPlaceholder } from "../../shared/constants/placeholders";
import {
  getFormattedAmount,
  getFormattedDate,
} from "../../shared/helpers/baseFormatters";
import { getFormattedTokenAmount } from "../../shared/helpers/formatters";
import { usePublicSaleCollateralToken } from "../hooks/usePublicSaleCollateralToken";
import { usePublicSaleData } from "../hooks/usePublicSaleData";
import { usePublicSaleToken } from "../hooks/usePublicSaleToken";
import {
  Container,
  Content,
  ItemContainer,
  ItemTitle,
  ItemValue,
  ItemSymbol,
  ItemError,
} from "../styles/SaleDetails";

// eslint-disable-next-line sonarjs/cognitive-complexity,complexity
export const SaleDetails = () => {
  const collateralToken = usePublicSaleCollateralToken();
  const saleToken = usePublicSaleToken();
  const publicSaleData = usePublicSaleData();

  const { symbol: collateralTokenSymbol } = collateralToken ?? {};
  const { symbol: saleTokenSymbol } = saleToken ?? {};
  const {
    collateralTokenDeposited,
    saleTokenBought,
    saleTokenTotalBought,
    saleTokenCap,
    startTimestamp,
    endTimestamp,
  } = publicSaleData ?? {};

  const [formattedSaleTokenTotalBought, formattedSaleTokenCap] = [
    saleTokenTotalBought,
    saleTokenCap,
  ].map((value) => (value ? getFormattedAmount(value) : null));

  const [formattedCollateralTokenDeposited, formattedSaleTokenBought] = [
    collateralTokenDeposited,
    saleTokenBought,
  ].map((value) => getFormattedTokenAmount(value));

  const [formattedStartTimestamp, formattedEndTimestamp] = [
    startTimestamp,
    endTimestamp,
  ].map((value) => (value ? getFormattedDate(value) : loadingPlaceholder));

  return (
    <Container>
      <Content>
        <ItemContainer>
          <ItemTitle>Total Token Sold:</ItemTitle>
          {formattedSaleTokenTotalBought && saleTokenSymbol ? (
            <ItemValue>
              {formattedSaleTokenTotalBought}{" "}
              <ItemSymbol>{saleTokenSymbol}</ItemSymbol>
            </ItemValue>
          ) : (
            <ItemValue>{loadingPlaceholder}</ItemValue>
          )}
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>Hard Cap:</ItemTitle>
          {formattedSaleTokenCap && saleTokenSymbol ? (
            <ItemValue>
              {formattedSaleTokenCap} <ItemSymbol>{saleTokenSymbol}</ItemSymbol>
            </ItemValue>
          ) : (
            <ItemValue>{loadingPlaceholder}</ItemValue>
          )}
        </ItemContainer>
      </Content>
      <Content>
        <ItemContainer>
          <ItemTitle>Your Deposit:</ItemTitle>
          {collateralTokenDeposited !== undefined && collateralTokenSymbol ? (
            <ItemValue>
              {formattedCollateralTokenDeposited} {collateralTokenSymbol}
            </ItemValue>
          ) : (
            <ItemValue>{loadingPlaceholder}</ItemValue>
          )}
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>Your Allocation:</ItemTitle>
          {saleTokenBought !== undefined && saleTokenSymbol ? (
            <ItemValue>
              {formattedSaleTokenBought}{" "}
              <ItemSymbol>{saleTokenSymbol}</ItemSymbol>
            </ItemValue>
          ) : (
            <ItemValue>{loadingPlaceholder}</ItemValue>
          )}
        </ItemContainer>
      </Content>
      <Content>
        <ItemContainer>
          <ItemTitle>Start Time:</ItemTitle>
          <ItemSymbol>{formattedStartTimestamp}</ItemSymbol>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>Close Time:</ItemTitle>
          <ItemError>{formattedEndTimestamp}</ItemError>
        </ItemContainer>
      </Content>
    </Container>
  );
};
