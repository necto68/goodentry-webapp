import { Flex } from "@chakra-ui/react";
import { forwardRef } from "react";

import { appLogo } from "../../icons/brand";
import { usePair } from "../../protected-perps-page/hooks/usePair";
import { usePairPrices } from "../../protected-perps-page/hooks/usePairPrices";
import {
  getFormattedProfitAndLossPercentage,
  getFormattedFullCurrency,
  getFormattedLeverage,
} from "../../shared/helpers/baseFormatters";
import { TitleCell } from "../../table/components/TitleCell";
import { getPositionSideTitle } from "../../trade-panel/helpers/getPositionSideTitle";
import { useSocialShareModalState } from "../hooks/useSocialShareModalState";
import {
  Container,
  EntryPriceRow,
  Leverage,
  Logo,
  PairName,
  PnlValue,
  PositionProfitRow,
  PriceCol,
  PriceTitle,
  PriceValue,
  SideValue,
} from "../styles/SocialShareContent";

const SocialShareContent = forwardRef<HTMLDivElement | null>(
  (props, reference) => {
    const { position } = useSocialShareModalState();

    const {
      positionSide,
      pairId,
      entryPrice,
      leverage,
      profitAndLoss,
      profitAndLossPercentage,
    } = position;

    const {
      title = "",
      baseTokenSymbol,
      quoteTokenSymbol,
    } = usePair(pairId) ?? {};
    const { baseTokenPrice } = usePairPrices(pairId) ?? {};

    const symbols: [string, string] | undefined =
      baseTokenSymbol && quoteTokenSymbol
        ? [baseTokenSymbol, quoteTokenSymbol]
        : undefined;

    const positionSideTitle = getPositionSideTitle(positionSide);

    const isPositive = profitAndLoss > 0;

    const formattedLeverage = getFormattedLeverage(leverage);
    const formattedProfitAndLossPercentage =
      getFormattedProfitAndLossPercentage(profitAndLossPercentage);
    const formattedEntryPrice = getFormattedFullCurrency(entryPrice);
    const formattedMarketPrice = baseTokenPrice
      ? getFormattedFullCurrency(baseTokenPrice)
      : null;

    return (
      <Container ref={reference}>
        <Logo src={appLogo} />
        <PairName>
          <TitleCell symbols={symbols} title={title} />
          <Flex>
            <SideValue positionSide={positionSide}>
              {positionSideTitle}
            </SideValue>
            <Leverage>{formattedLeverage}</Leverage>
          </Flex>
        </PairName>
        <PositionProfitRow>
          <PnlValue isPositive={isPositive}>
            {formattedProfitAndLossPercentage}
          </PnlValue>
        </PositionProfitRow>
        <EntryPriceRow>
          <PriceCol>
            <PriceTitle>Entry Price</PriceTitle>
            <PriceValue>{formattedEntryPrice}</PriceValue>
          </PriceCol>
          <PriceCol>
            <PriceTitle>Market Price</PriceTitle>
            <PriceValue>{formattedMarketPrice}</PriceValue>
          </PriceCol>
        </EntryPriceRow>
      </Container>
    );
  }
);

SocialShareContent.displayName = "SocialShareContent";

export { SocialShareContent };
