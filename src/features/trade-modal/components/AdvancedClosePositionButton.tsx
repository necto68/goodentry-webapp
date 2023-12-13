import { Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

import { getFormattedAPY } from "../../shared/helpers/baseFormatters";
import { positionPartMultipliers } from "../constants/positionPartMultipliers";
import { Container, Title } from "../styles/AdvancedClosePositionButton";
import { PositionPartMultiplier } from "../types/PositionPartMultiplier";

import type { FC } from "react";

interface AdvancedClosePositionButtonProps {
  readonly handleButtonClick: (
    positionPartMultiplier: PositionPartMultiplier
  ) => void;
}

export const AdvancedClosePositionButton: FC<
  AdvancedClosePositionButtonProps
> = ({ handleButtonClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Container>
      <Button
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        rightIcon={isExpanded ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
        size="xs"
      >
        Advanced
      </Button>
      {isExpanded ? (
        <Container>
          <Title>
            Close a position in several transactions can help avoiding slippage
            error.
          </Title>
          <Title>
            Please make sure to fully close the position to avoid unpredictable
            underlying assets exposure.
          </Title>
          <ButtonGroup isAttached>
            {[
              PositionPartMultiplier.PERCENTS_25,
              PositionPartMultiplier.PERCENTS_50,
              PositionPartMultiplier.PERCENTS_75,
            ].map((positionPartMultiplier) => {
              const formattedPart = getFormattedAPY(
                positionPartMultipliers[positionPartMultiplier],
                { minimumFractionDigits: 0, maximumFractionDigits: 0 }
              );

              return (
                <Button
                  key={positionPartMultiplier}
                  onClick={() => {
                    handleButtonClick(positionPartMultiplier);
                  }}
                  w="full"
                >
                  {`Close ${formattedPart}`}
                </Button>
              );
            })}
          </ButtonGroup>
        </Container>
      ) : null}
    </Container>
  );
};
