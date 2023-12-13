import { Title } from "../../public-sale-page/styles/ClaimInformation";
import {
  ItemContainer,
  ItemTitle,
  ItemValue,
} from "../../public-sale-page/styles/SaleDetails";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedAmount } from "../../shared/helpers/baseFormatters";
import { useGovernanceToken } from "../hooks/useGovernanceToken";
import { Container, Content } from "../styles/LockedOverview";

export const LockedOverview = () => {
  const { symbol, balance } = useGovernanceToken() ?? {};

  const title = symbol ? `${symbol} Balance` : loadingPlaceholder;
  const formattedBalance = balance
    ? getFormattedAmount(balance)
    : loadingPlaceholder;

  return (
    <Container>
      <Title>Locked Overview</Title>
      <Content>
        <ItemContainer>
          <ItemTitle>{title}</ItemTitle>
          <ItemValue>{formattedBalance}</ItemValue>
        </ItemContainer>
      </Content>
    </Container>
  );
};
