import { Icon } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";

import { InfoValue } from "../../shared/modal/styles/ModalInfo";
import { Container } from "../styles/FutureInfoValues";

import type { FC } from "react";

interface FutureInfoValuesProps {
  readonly currentValue: string;
  readonly futureValue: string;
  readonly isPositive: boolean;
}

export const FutureInfoValues: FC<FutureInfoValuesProps> = ({
  currentValue,
  futureValue,
  isPositive,
}) => (
  <Container>
    <InfoValue>{currentValue}</InfoValue>
    <Icon as={FiArrowRight} color={isPositive ? "brand" : "error"} />
    <InfoValue>{futureValue}</InfoValue>
  </Container>
);
