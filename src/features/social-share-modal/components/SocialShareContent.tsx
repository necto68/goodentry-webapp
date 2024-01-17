import { Flex } from "@chakra-ui/react";
import { forwardRef } from "react";

import { appLogo } from "../../icons/brand";
import { usePair } from "../../protected-perps-page/hooks/usePair";
import { usePairPrices } from "../../protected-perps-page/hooks/usePairPrices";
import {
  getFormattedAPY,
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
      initialCollateral,
      leverage,
      profitAndLossValue,
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

    const isPositive = profitAndLossValue.gt(0);

    const profitAndLossPercentValue = initialCollateral.gt(0)
      ? profitAndLossValue.div(initialCollateral).toNumber()
      : 0;

    const formattedProfitAndLossPercent = getFormattedAPY(
      profitAndLossPercentValue
    );

    const formattedLeverage = getFormattedLeverage(leverage);
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
            {formattedProfitAndLossPercent}
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
