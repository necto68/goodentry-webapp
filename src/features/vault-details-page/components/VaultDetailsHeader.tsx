import { Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { getImageSourceBySymbol } from "../../icons/helpers/getImageSourceBySymbol";
import { usePair } from "../../protected-perps-page/hooks/usePair";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { InfoRow } from "../../shared/modal/styles/ModalInfo";
import { formatNumberWithSuffix } from "../../vault/helpers/formatNumberWithSuffix";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { VaultStatus } from "../../vault/types/VaultStatus";
import { RewardsTag } from "../../vaults-page/components/RewardsTag";
import {
  InfoDescription,
  InfoValueBold,
  NoTag,
  VaultInfo,
} from "../../vaults-page/styles/VaultCard";
import { useVault } from "../hooks/useVault";
import {
  Container,
  Content,
  PairTitle,
  TokenIconLeft,
  TokenIconLeftMobile,
  TokenIconRight,
  TokenIconRightMobile,
  VaultBrief,
  Wrapper,
} from "../styles/VaultDetailsPage";

export const VaultDetailsHeader = () => {
  const { vaultId = "" } = useParams();

  const { pairId, status } = getVaultConfig(vaultId);

  const vault = useVault(vaultId);

  const { title, baseTokenSymbol, quoteTokenSymbol } = usePair(pairId) ?? {};

  const { totalValueLocked } = vault ?? {};

  const formattedTvl = totalValueLocked
    ? formatNumberWithSuffix(totalValueLocked)
    : loadingPlaceholder;

  const [baseTokenIcon, quoteTokenIcon] = [
    baseTokenSymbol,
    quoteTokenSymbol,
  ].map((symbol) => {
    const imageSource = symbol ? getImageSourceBySymbol(symbol) : null;

    return imageSource ?? undefined;
  });

  return (
    <Wrapper>
      <Container>
        <Content>
          <VaultBrief>
            <Flex>
              {status === VaultStatus.ACTIVE_REWARDS ? (
                <RewardsTag />
              ) : (
                <NoTag />
              )}
            </Flex>
            <PairTitle>
              {title}
              <TokenIconLeftMobile
                alt={baseTokenSymbol}
                draggable={false}
                src={baseTokenIcon}
              />
              <TokenIconRightMobile
                alt={quoteTokenSymbol}
                draggable={false}
                src={quoteTokenIcon}
              />
            </PairTitle>
            <VaultInfo>
              <InfoRow>
                <InfoDescription>Current Deposits</InfoDescription>
                <InfoValueBold>{formattedTvl}</InfoValueBold>
              </InfoRow>
            </VaultInfo>
          </VaultBrief>
          <Flex alignItems="center">
            <TokenIconLeft
              alt={baseTokenSymbol}
              draggable={false}
              src={baseTokenIcon}
            />
            <TokenIconRight
              alt={quoteTokenSymbol}
              draggable={false}
              src={quoteTokenIcon}
            />
          </Flex>
        </Content>
      </Container>
    </Wrapper>
  );
};
