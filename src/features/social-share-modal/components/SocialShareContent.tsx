import { Flex } from "@chakra-ui/react";
import { forwardRef } from "react";

import { appLogo } from "../../icons/brand";
import { usePair } from "../../protected-perps-page/hooks/usePair";
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
    const { position, currentPrice } = useSocialShareModalState();

    const { side, pairId, size, profitAndLossValue, entryPrice } = position;

    const { token0Symbol = "", token1Symbol = "" } = usePair(pairId) ?? {};

    const isLongSide = side === PositionSide.LONG;

    const isPositive = profitAndLossValue.gt(0);
    const formattedProfitAndLossPercent = getFormattedAPY(
      size.gt(0) ? profitAndLossValue.div(size).toNumber() : 0
    );

    const formattedEntryPrice = getFormattedFullCurrency(entryPrice);
    const formattedMarketPrice = getFormattedFullCurrency(currentPrice);

    return (
      <Container ref={reference}>
        <Logo src={appLogo} />
        <PairName>
          <TitleCell symbols={[token0Symbol, token1Symbol]} title={pairId} />
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
