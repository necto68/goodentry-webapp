import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { usePublicSaleToken } from "../hooks/usePublicSaleToken";
import { Container, Title, TitleSymbol, SubTitle } from "../styles/Header";

export const Header = () => {
  const { symbol } = usePublicSaleToken() ?? {};

  return (
    <Container>
      {symbol ? (
        <Title>
          <TitleSymbol>{symbol}</TitleSymbol> Fair Sale
        </Title>
      ) : (
        <Title>{loadingPlaceholder}</Title>
      )}
      <SubTitle>Good Entry TGE Fair Sale</SubTitle>
    </Container>
  );
};
