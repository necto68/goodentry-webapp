import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { InfoRow } from "../../shared/modal/styles/ModalInfo";
import {
  Container,
  Content,
  PairTitle,
  VaultBrief,
  Wrapper,
} from "../../vault-details-page/styles/VaultDetailsPage";
import {
  InfoDescription,
  InfoValueBold,
  VaultInfo,
} from "../../vaults-page/styles/VaultCard";
import { useReferrals } from "../hooks/useReferrals";
import { Title, TitleAccent } from "../styles/ReferralsPage";

export const ReferralHeader = () => {
  const referrals = useReferrals();
  const { myReferralsCount } = referrals ?? {};

  return (
    <Wrapper>
      <Container>
        <Content>
          <VaultBrief>
            <PairTitle>
              <Title>
                Good <TitleAccent>Referral Program</TitleAccent>
              </Title>
            </PairTitle>
            <VaultInfo>
              <InfoRow />
              <InfoRow>
                <InfoDescription>Total Referrals:</InfoDescription>
                <InfoValueBold>
                  {myReferralsCount ?? loadingPlaceholder}
                </InfoValueBold>
              </InfoRow>
            </VaultInfo>
          </VaultBrief>
        </Content>
      </Container>
    </Wrapper>
  );
};
