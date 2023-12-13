import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import {
  getFormattedTickerBorrowRate,
  getFormattedTickerStrikePrice,
} from "../../shared/helpers/formatters";
import { TickerContent, TickerTitle } from "../styles/TickerButton";

import type { Ticker } from "../../queries/types/Ticker";
import type { FC } from "react";

interface TickerButtonProps {
  readonly ticker?: Ticker;
  readonly isSelected?: boolean;
  readonly onClick?: (tickerAddress: Ticker["address"]) => void;
}

export const TickerButton: FC<TickerButtonProps> = ({
  ticker,
  isSelected,
  onClick,
}) => {
  const { address, borrowRatePerHour, strikePrice } = ticker ?? {};

  const formattedStrikePrice = getFormattedTickerStrikePrice(strikePrice);
  const formattedBorrowRate = getFormattedTickerBorrowRate(borrowRatePerHour);

  const handleClick = useCallback(() => {
    if (onClick && address) {
      onClick(address);
    }
  }, [onClick, address]);

  return (
    <Button
      border="1px solid"
      borderColor={isSelected ? "brand" : "transparent"}
      height="36px"
      onClick={handleClick}
      size="sm"
    >
      <TickerContent>
        <TickerTitle>{formattedStrikePrice}</TickerTitle>
        <TickerTitle>{formattedBorrowRate}</TickerTitle>
      </TickerContent>
    </Button>
  );
};
