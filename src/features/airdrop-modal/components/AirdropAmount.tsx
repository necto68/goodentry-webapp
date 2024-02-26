import { useGovernanceToken } from "../../lock-page/hooks/useGovernanceToken";
import { getFormattedTokenAmountWithSymbol } from "../../shared/helpers/formatters";
import { TitleCell } from "../../table/components/TitleCell";
import { useAirdropData } from "../hooks/useAirdropData";
import { Container } from "../styles/AirdropAmount";

export const AirdropAmount = () => {
  const { symbol } = useGovernanceToken() ?? {};
  const { airdropAmount } = useAirdropData() ?? {};

  const formattedAirdropAmount = getFormattedTokenAmountWithSymbol(
    airdropAmount,
    symbol
  );

  return (
    <Container>
      <TitleCell
        symbols={symbol ? [symbol] : undefined}
        title={formattedAirdropAmount}
      />
    </Container>
  );
};
