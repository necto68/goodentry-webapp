import { getImageSourceBySymbol } from "../../icons/helpers/getImageSourceBySymbol";
import {
  Container,
  TokenIcon,
  SecondTokenIcon,
  TitleContainer,
  TokensContainer,
} from "../styles/TitleCell";

import type { Token } from "../../queries/types/Token";
import type { FC } from "react";

export interface TitleCellProps {
  readonly title: string;
  readonly symbols?: [Token["symbol"], Token["symbol"]] | [Token["symbol"]];
}

export const TitleCell: FC<TitleCellProps> = ({ title, symbols }) => {
  const [imageSource0, imageSource1] = symbols
    ? symbols.map((symbol) => (symbol ? getImageSourceBySymbol(symbol) : null))
    : [null, null];

  return (
    <Container>
      <TokensContainer>
        {imageSource0 ? <TokenIcon src={imageSource0} /> : null}
        {imageSource1 ? <SecondTokenIcon src={imageSource1} /> : null}
      </TokensContainer>
      <TitleContainer>{title}</TitleContainer>
    </Container>
  );
};
