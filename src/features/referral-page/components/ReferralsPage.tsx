import { Flex } from "@chakra-ui/react";

import {
  VaultDefaultBody,
  VaultDescription,
  Description,
  VaultModalsContainer,
} from "../../vault-details-page/styles/VaultDetailsPage";
import { Link, Title } from "../styles/ReferralsPage";

import { ReferralHeader } from "./ReferralHeader";
import { ReferralHistoryTable } from "./ReferralHistoryTable";
import { ReferralModalRoot } from "./ReferralModalRoot";

export const ReferralsPage = () => (
  <Flex alignItems="center" direction="column" width="100vw">
    <ReferralHeader />
    <VaultDefaultBody>
      <VaultDescription>
        <Title>Overview</Title>
        <Description>
          Earn a share of fees with Good Entry -{" "}
          <Link href="https://goodentrylabs.medium.com/" target="_blank">
            Referral Program
          </Link>
        </Description>
        <Title>Fee Structure</Title>
        <Description>
          When your referral close a trade, you will earn a share of the trading
          fees they pay.
        </Description>
        <ReferralHistoryTable />
      </VaultDescription>
      <VaultModalsContainer>
        <ReferralModalRoot />
      </VaultModalsContainer>
    </VaultDefaultBody>
  </Flex>
);
