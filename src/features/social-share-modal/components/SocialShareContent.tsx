import { Flex } from "@chakra-ui/react";
import { forwardRef } from "react";

import { appLogo } from "../../icons/brand";
import { usePair } from "../../protected-perps-page/hooks/usePair";
import { usePairPrices } from "../../protected-perps-page/hooks/usePairPrices";
import { PositionSide } from "../../queries/types/Position";
import {
  getFormattedAPY,
  getFormattedFullCurrency,
} from "../../shared/helpers/baseFormatters";
import { TitleCell } from "../../table/components/TitleCell";
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

    const { side, pairId, size, profitAndLossValue, entryPrice } = position;

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

    const isLongSide = side === PositionSide.LONG;

    const isPositive = profitAndLossValue.gt(0);
    const formattedProfitAndLossPercent = getFormattedAPY(
      size.gt(0) ? profitAndLossValue.div(size).toNumber() : 0
    );

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
            <SideValue side={side}>{isLongSide ? "Long" : "Short"}</SideValue>
            <Leverage>10x</Leverage>
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
