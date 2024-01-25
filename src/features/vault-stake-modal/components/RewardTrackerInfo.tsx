import { loadingPlaceholder } from "../../shared/constants/placeholders";
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

export const RewardTrackerInfo = () => {
  const { vaultId } = useVaultStakeModalState();

  const { vaultTokenQuery, rewardTokenQuery } =
    useVaultStakeModalQueries(vaultId);
  const { stakedBalance } = useRewardTrackerData(vaultId) ?? {};
  const { symbol: vaultTokenSymbol, balance } = vaultTokenQuery.data ?? {};
  const { symbol: rewardTokenSymbol } = rewardTokenQuery.data ?? {};

  const formattedRewards = rewardTokenSymbol
    ? `400 ${rewardTokenSymbol} / day`
    : loadingPlaceholder;

  const [formattedVaultTokenBalance, formattedStakedBalance] = [
    balance,
    stakedBalance,
  ].map((value) => getFormattedTokenAmountWithSymbol(value, vaultTokenSymbol));

  return (
    <Container>
      <InfoRow>
        <InfoTitle>Rewards</InfoTitle>
        <InfoValue>{formattedRewards}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Unstaked Balance</InfoTitle>
        <InfoValue>{formattedVaultTokenBalance}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Staked Balance</InfoTitle>
        <InfoValue>{formattedStakedBalance}</InfoValue>
      </InfoRow>
    </Container>
  );
};
