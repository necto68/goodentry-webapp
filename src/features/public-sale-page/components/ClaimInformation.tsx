import { Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

import { RoutePathname } from "../../root/types/RoutePathname";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedDate } from "../../shared/helpers/baseFormatters";
import { toBig } from "../../shared/helpers/bigjs";
import { getFormattedTokenAmount } from "../../shared/helpers/formatters";
import { usePublicSaleCollateralToken } from "../hooks/usePublicSaleCollateralToken";
import { usePublicSaleData } from "../hooks/usePublicSaleData";
import { usePublicSaleToken } from "../hooks/usePublicSaleToken";
import {
  Container,
  Title,
  Separator,
  Content,
  InfoContent,
  InfoContainer,
  ButtonsContent,
} from "../styles/ClaimInformation";
import {
  ItemTitle,
  ItemValue,
  ItemSymbol,
  ItemError,
} from "../styles/SaleDetails";

import { AddToWalletButton } from "./AddToWalletButton";
import { ClaimMainButton } from "./ClaimMainButton";

export const ClaimInformation = () => {
  const collateralToken = usePublicSaleCollateralToken();
  const saleToken = usePublicSaleToken();
  const publicSaleData = usePublicSaleData();

  const { symbol: collateralTokenSymbol } = collateralToken ?? {};
  const { symbol: saleTokenSymbol } = saleToken ?? {};
  const { saleTokenPrice, saleTokenBought, endTimestamp } =
    publicSaleData ?? {};

  const saleTokenPriceBig =
    saleTokenPrice !== undefined ? toBig(saleTokenPrice) : undefined;

  const [formattedSaleTokenBought, formattedSaleTokenPrice] = [
    saleTokenBought,
    saleTokenPriceBig,
  ].map((value) => getFormattedTokenAmount(value));

  const formattedEndTimestamp = endTimestamp
    ? getFormattedDate(endTimestamp)
    : loadingPlaceholder;

  return (
    <Container>
      <Title>Claim Information</Title>
      <Separator />
      <Content>
        <InfoContent>
          <InfoContainer>
            <ItemTitle>Your Allocation:</ItemTitle>
            {saleTokenBought !== undefined && saleTokenSymbol ? (
              <ItemValue>
                {formattedSaleTokenBought}{" "}
                <ItemSymbol>{saleTokenSymbol}</ItemSymbol>
              </ItemValue>
            ) : (
              <ItemValue>{loadingPlaceholder}</ItemValue>
            )}
          </InfoContainer>
          <InfoContainer>
            <ItemTitle>Price per Token:</ItemTitle>
            {saleTokenPriceBig && collateralTokenSymbol ? (
              <ItemValue>
                {`${formattedSaleTokenPrice} ${collateralTokenSymbol}`}
              </ItemValue>
            ) : (
              <ItemValue>{loadingPlaceholder}</ItemValue>
            )}
          </InfoContainer>
          <InfoContainer>
            <ItemTitle>Claim Opens:</ItemTitle>
            <ItemError>{formattedEndTimestamp}</ItemError>
          </InfoContainer>
        </InfoContent>
        <ButtonsContent>
          <ClaimMainButton />
          <AddToWalletButton />
          <Button as={Link} to={RoutePathname.LOCK}>
            Go to Lock
          </Button>
        </ButtonsContent>
      </Content>
    </Container>
  );
};
