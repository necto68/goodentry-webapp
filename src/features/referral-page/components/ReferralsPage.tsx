import { Flex } from "@chakra-ui/react";

import { getFormattedFullCurrency } from "../../shared/helpers/baseFormatters";
import { useReferrals } from "../hooks/useReferrals";
import { ReferralModalStateProvider } from "../providers/ReferralModalStateProvider";
import { ReferralModalTransactionsProvider } from "../providers/ReferralModalTransactionsProvider";
import {
  Container,
  Content,
  InfoBox,
  InputCardBox,
  Subtitle,
  SubtitleBox,
  Title,
  TopRow,
} from "../styles/ReferralsPage";

import { ReferralHeader } from "./ReferralHeader";
import { ReferralHistoryTable } from "./ReferralHistoryTable";
import { ReferralInputCard } from "./ReferralInputCard";

export const ReferralsPage = () => {
  const { myReferralsCount, totalRewards } = useReferrals() ?? {};

  return (
    <Flex alignItems="center" direction="column" width="100vw">
      <ReferralModalStateProvider>
        <ReferralModalTransactionsProvider>
          <ReferralHeader />
          <Container>
            <Content>
              <TopRow>
                <InfoBox>
                  <Subtitle>Total Referral(s)</Subtitle>
                  <Title>{myReferralsCount ?? 0}</Title>
                </InfoBox>
                <InfoBox>
                  <Subtitle>Total Referral Rewards</Subtitle>
                  <Title>{getFormattedFullCurrency(totalRewards ?? 0)}</Title>
                </InfoBox>
              </TopRow>
              <InputCardBox>
                <SubtitleBox>
                  <Subtitle>My Referrer Link</Subtitle>
                </SubtitleBox>
                <ReferralInputCard />
              </InputCardBox>
            </Content>
            <Content>
              <InputCardBox>
                <SubtitleBox>
                  <Subtitle>Affiliates history</Subtitle>
                </SubtitleBox>
                <ReferralHistoryTable />
              </InputCardBox>
            </Content>
          </Container>
        </ReferralModalTransactionsProvider>
      </ReferralModalStateProvider>
    </Flex>
  );
};
