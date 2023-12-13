import { Slider, SliderFilledTrack, SliderTrack } from "@chakra-ui/react";

import { loadingPlaceholder } from "../../shared/constants/placeholders";
import {
  getFormattedAmount,
  getFormattedAPY,
} from "../../shared/helpers/baseFormatters";
import { usePublicSaleData } from "../hooks/usePublicSaleData";
import { usePublicSaleToken } from "../hooks/usePublicSaleToken";
import { Container, TitleContainer, Title, Value } from "../styles/ProgressBar";

export const ProgressBar = () => {
  const publicSaleToken = usePublicSaleToken();
  const publicSaleData = usePublicSaleData();

  const { symbol } = publicSaleToken ?? {};
  const { collateralTokenTotalDeposited, collateralTokenCap, saleTokenCap } =
    publicSaleData ?? {};

  const progressBarValue =
    collateralTokenTotalDeposited && collateralTokenCap?.gt(0)
      ? collateralTokenTotalDeposited.div(collateralTokenCap).toNumber()
      : 0;

  const formattedProgressBarValue = publicSaleData
    ? getFormattedAPY(progressBarValue)
    : loadingPlaceholder;

  const formattedSaleTokenCap = saleTokenCap
    ? getFormattedAmount(saleTokenCap)
    : null;

  return (
    <Container>
      <TitleContainer>
        <Title>
          Progress: <Value>{formattedProgressBarValue}</Value>
        </Title>
        {formattedSaleTokenCap && symbol ? (
          <Title>
            Hard Cap: {formattedSaleTokenCap} <Value>{symbol}</Value>
          </Title>
        ) : (
          <Title>{loadingPlaceholder}</Title>
        )}
      </TitleContainer>
      <Slider max={1} min={0} value={progressBarValue}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
      </Slider>
    </Container>
  );
};
