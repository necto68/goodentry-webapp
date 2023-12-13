import { useGovernanceToken } from "../../lock-page/hooks/useGovernanceToken";
import { useLockToken } from "../../lock-page/hooks/useLockToken";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedAmount } from "../../shared/helpers/baseFormatters";
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

  const [formattedLockTokenBalanceValue, formattedGovernanceTokenBalanceValue] =
    [lockTokenBalance, governanceTokenBalance].map((value) =>
      value ? getFormattedAmount(value) : null
    );

  const formattedLockTokenBalance =
    formattedLockTokenBalanceValue && lockTokenSymbol
      ? `${formattedLockTokenBalanceValue} ${lockTokenSymbol}`
      : loadingPlaceholder;
  const formattedGovernanceTokenBalance =
    formattedGovernanceTokenBalanceValue && governanceTokenSymbol
      ? `${formattedGovernanceTokenBalanceValue} ${governanceTokenSymbol}`
      : loadingPlaceholder;

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
