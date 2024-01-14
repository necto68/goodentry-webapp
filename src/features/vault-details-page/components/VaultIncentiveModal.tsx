import { useParams } from "react-router-dom";

import { arb } from "../../icons/coins";
import { usePair } from "../../protected-perps-page/hooks/usePair";
import {
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { Separator } from "../../vaults-page/styles/VaultCard";
import {
  Container,
  Description,
  Title,
  TokenIcon,
  Actions,
  Action,
  InfoValueRow,
} from "../styles/VaultIncentiveModal";

export const VaultIncentiveModal = () => {
  const { vaultId = "" } = useParams();

  const { pairId } = getVaultConfig(vaultId);

  const { baseTokenSymbol = "" } = usePair(pairId) ?? {};

  return baseTokenSymbol === "ARB" ? (
    <Container>
      <Title>Farming rewards</Title>
      <Separator />
      <Description>
        The ARB-USDC vault receive rewards daily that are directly deposited in
        the vault.
      </Description>
      <InfoRow>
        <InfoTitle>Total rewards</InfoTitle>
        <InfoValueRow>
          400&nbsp;
          <TokenIcon src={arb} />
          &nbsp;ARB / day
        </InfoValueRow>
      </InfoRow>
    </Container>
  ) : (
    <Container>
      <Title>Farming rewards</Title>
      <Separator />
      <InfoRow>
        <InfoTitle>Rewards</InfoTitle>
        <InfoValueRow>
          400&nbsp;
          <TokenIcon src={arb} />
          &nbsp;ARB / day
        </InfoValueRow>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Unstaked Balance</InfoTitle>
        <InfoValue>0</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Staked Balance</InfoTitle>
        <InfoValue>0</InfoValue>
      </InfoRow>
      <Actions>
        <Action variant="brand">Stake</Action>
        <Action>Unstake</Action>
      </Actions>
      <Separator />
      <InfoRow>
        <InfoTitle>Pending Rewards</InfoTitle>
        <InfoValueRow>
          0&nbsp;
          <TokenIcon src={arb} />
        </InfoValueRow>
      </InfoRow>
      <Action>Claim</Action>
    </Container>
  );
};
