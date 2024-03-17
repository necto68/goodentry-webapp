import {
  getFormattedFullCurrency,
  getFormattedProfitAndLoss,
} from "../../shared/helpers/baseFormatters";
import { useWallet } from "../../wallet/hooks/useWallet";
import { areAddressesEqual } from "../../web3/helpers/addresses";
import { useLeaderboardState } from "../hooks/useLeaderboardState";
import {
  BrandValue,
  Container,
  Content,
  ErrorValue,
  Title,
  Value,
} from "../styles/AccountRank";

export const AccountRank = () => {
  const { account } = useWallet();
  const { selectedWeekRows } = useLeaderboardState();

  const accountRow = selectedWeekRows?.find((row) =>
    account ? areAddressesEqual(row.account, account) : false
  );

  if (!accountRow) {
    return null;
  }

  const { rank, weeklyTradesAmount, weeklyTotalVolume, weeklyProfitAndLoss } =
    accountRow;

  const formattedTotalVolume = getFormattedFullCurrency(weeklyTotalVolume);
  const formattedProfitAndLoss = getFormattedProfitAndLoss(weeklyProfitAndLoss);

  return (
    <Container>
      <Content>
        <Title>Your Rank</Title>
        <Value>{rank}</Value>
      </Content>
      <Content>
        <Title>Total Trades Completed</Title>
        <Value>{weeklyTradesAmount}</Value>
      </Content>
      <Content>
        <Title>Total Weekly Volume (USD)</Title>
        <Value>{formattedTotalVolume}</Value>
      </Content>
      <Content>
        <Title>Weekly PNL (USD)</Title>
        {weeklyProfitAndLoss > 0 ? (
          <BrandValue>{formattedProfitAndLoss}</BrandValue>
        ) : (
          <ErrorValue>{formattedProfitAndLoss}</ErrorValue>
        )}
      </Content>
    </Container>
  );
};
