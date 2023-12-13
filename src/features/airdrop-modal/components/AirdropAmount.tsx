import { useGovernanceToken } from "../../lock-page/hooks/useGovernanceToken";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedAmount } from "../../shared/helpers/baseFormatters";
import { TitleCell } from "../../table/components/TitleCell";
import { useAirdropData } from "../hooks/useAirdropData";
import { Container } from "../styles/AirdropAmount";

export const AirdropAmount = () => {
  const { symbol } = useGovernanceToken() ?? {};
  const { airdropAmount } = useAirdropData() ?? {};

  const formattedAirdropAmountValue = airdropAmount
    ? getFormattedAmount(airdropAmount)
    : null;

  const formattedAirdropAmount =
    formattedAirdropAmountValue && symbol
      ? `${formattedAirdropAmountValue} ${symbol}`
      : loadingPlaceholder;

  return (
    <Container>
      {symbol ? (
        <TitleCell symbols={[symbol]} title={formattedAirdropAmount} />
      ) : (
        loadingPlaceholder
      )}
    </Container>
  );
};
