import { getFormattedTokenAmountWithSymbol } from "../../shared/helpers/formatters";
import {
  Container,
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { useRewardTrackerData } from "../hooks/useRewardTrackerData";
import { useVaultStakeModalQueries } from "../hooks/useVaultStakeModalQueries";
import { useVaultStakeModalState } from "../stores/useVaultStakeModalState";

export const ClaimableBalanceInfo = () => {
  const { vaultId } = useVaultStakeModalState();

  const { rewardTokenQuery } = useVaultStakeModalQueries(vaultId);
  const { claimableBalance } = useRewardTrackerData(vaultId) ?? {};
  const { symbol } = rewardTokenQuery.data ?? {};

  const formattedClaimableBalance = getFormattedTokenAmountWithSymbol(
    claimableBalance,
    symbol
  );

  return (
    <Container>
      <InfoRow>
        <InfoTitle>Claimable Reward</InfoTitle>
        <InfoValue>{formattedClaimableBalance}</InfoValue>
      </InfoRow>
    </Container>
  );
};
