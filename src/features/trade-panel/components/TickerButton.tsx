import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { TickerContent, TickerTitle } from "../styles/TickerButton";

import type { FC } from "react";

interface TickerButtonProps {
  readonly isSelected?: boolean;
  readonly onClick?: () => void;
}

export const TickerButton: FC<TickerButtonProps> = ({
  isSelected,
  onClick,
}) => {
  const formattedStrikePrice = "$1000";
  const formattedBorrowRate = "0.5%";

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

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
