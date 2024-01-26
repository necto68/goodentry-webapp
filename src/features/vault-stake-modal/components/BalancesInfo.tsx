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

export const BalancesInfo = () => {
  const { vaultId } = useVaultStakeModalState();

  const { vaultTokenQuery } = useVaultStakeModalQueries(vaultId);
  const { stakedBalance } = useRewardTrackerData(vaultId) ?? {};
  const { symbol: vaultTokenSymbol, balance } = vaultTokenQuery.data ?? {};

  const [formattedVaultTokenBalance, formattedStakedBalance] = [
    balance,
    stakedBalance,
  ].map((value) => getFormattedTokenAmountWithSymbol(value, vaultTokenSymbol));

  return (
    <Container>
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
