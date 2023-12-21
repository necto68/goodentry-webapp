import { getFormattedNumber } from "../../shared/helpers/baseFormatters";
import { usePairDetailsState } from "../hooks/usePairDetailsState";
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
  const { pair, assetPrices } = usePairDetailsState(pairId);

  const { title } = pair ?? {};
  const { currentPrice = 0 } = assetPrices ?? {};

  // TODO: v2 update
  const [token0Symbol, token1Symbol] = ["SYMBOL", "SYMBOL"];

  const formattedCurrentPrice = getFormattedNumber(currentPrice);

  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        <Price>
          Price: 1 {token0Symbol} = {formattedCurrentPrice} {token1Symbol}
        </Price>
      </TitleContainer>
      <TableContainer>
        <PairAssetsTable pairId={pairId} />
      </TableContainer>
    </Container>
  );
};
