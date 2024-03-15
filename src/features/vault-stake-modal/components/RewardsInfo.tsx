import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedAPY } from "../../shared/helpers/baseFormatters";
import {
  Container,
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { useVaultApiData } from "../../vault-details-page/hooks/useVaultApiData";
import { useVaultStakeModalState } from "../stores/useVaultStakeModalState";

export const RewardsInfo = () => {
  const { vaultId } = useVaultStakeModalState();

  const { rewardsAnnualPercentageRate } = useVaultApiData(vaultId) ?? {};

  const formattedRewards = "1000 ARB / day";

  const formattedRewardsAPR = rewardsAnnualPercentageRate
    ? getFormattedAPY(rewardsAnnualPercentageRate)
    : loadingPlaceholder;

  return (
    <Container>
      <InfoRow>
        <InfoTitle>Rewards</InfoTitle>
        <InfoValue>{formattedRewards}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Rewards APR</InfoTitle>
        <InfoValue>{formattedRewardsAPR}</InfoValue>
      </InfoRow>
    </Container>
  );
};
