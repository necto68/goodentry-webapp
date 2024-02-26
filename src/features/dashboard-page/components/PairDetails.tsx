import { usePair } from "../../protected-perps-page/hooks/usePair";
import { usePairPrices } from "../../protected-perps-page/hooks/usePairPrices";
import { getFormattedNumber } from "../../shared/helpers/baseFormatters";
import {
  Container,
  TitleContainer,
  Title,
  Price,
  TableContainer,
} from "../styles/PairDetails";

import { PairAssetsTable } from "./PairAssetsTable";

import type { FC } from "react";

interface PairDetailsProps {
  readonly pairId: string;
}

export const PairDetails: FC<PairDetailsProps> = ({ pairId }) => {
  const { title, baseTokenSymbol, quoteTokenSymbol } = usePair(pairId) ?? {};
  const { baseTokenPrice } = usePairPrices(pairId) ?? {};

  const formattedBaseTokenPrice = baseTokenPrice
    ? getFormattedNumber(baseTokenPrice)
    : null;

  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        <Price>
          Price: 1 {baseTokenSymbol} = {formattedBaseTokenPrice}{" "}
          {quoteTokenSymbol}
        </Price>
      </TitleContainer>
      <TableContainer>
        <PairAssetsTable pairId={pairId} />
      </TableContainer>
    </Container>
  );
};
