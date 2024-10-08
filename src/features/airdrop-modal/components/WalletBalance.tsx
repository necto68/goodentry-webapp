import { useGovernanceToken } from "../../lock-page/hooks/useGovernanceToken";
import { useLockToken } from "../../lock-page/hooks/useLockToken";
import { getFormattedTokenAmountWithSymbol } from "../../shared/helpers/formatters";
import { TitleCell } from "../../table/components/TitleCell";
import {
  Container,
  Title,
  Content,
  BalanceContent,
} from "../styles/WalletBalance";

export const WalletBalance = () => {
  const { symbol: lockTokenSymbol, balance: lockTokenBalance } =
    useLockToken() ?? {};
  const { symbol: governanceTokenSymbol, balance: governanceTokenBalance } =
    useGovernanceToken() ?? {};

  const formattedLockTokenBalance = getFormattedTokenAmountWithSymbol(
    lockTokenBalance,
    lockTokenSymbol
  );

  const formattedGovernanceTokenBalance = getFormattedTokenAmountWithSymbol(
    governanceTokenBalance,
    governanceTokenSymbol
  );

  return (
    <Container>
      <Content>
        <Title>Wallet Balance</Title>
        <BalanceContent>
          {lockTokenSymbol ? (
            <TitleCell
              symbols={[lockTokenSymbol]}
              title={formattedLockTokenBalance}
            />
          ) : null}
          {governanceTokenSymbol ? (
            <TitleCell
              symbols={[governanceTokenSymbol]}
              title={formattedGovernanceTokenBalance}
            />
          ) : null}
        </BalanceContent>
      </Content>
    </Container>
  );
};
