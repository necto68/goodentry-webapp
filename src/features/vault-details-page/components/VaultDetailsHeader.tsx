import { Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { getImageSourceBySymbol } from "../../icons/helpers/getImageSourceBySymbol";
import { usePair } from "../../protected-perps-page/hooks/usePair";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { formatNumberWithSuffix } from "../../vault/helpers/formatNumberWithSuffix";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { VaultStatus } from "../../vault/types/VaultStatus";
import { MigrationTag } from "../../vaults-page/components/MigrationTag";
import { RewardsTag } from "../../vaults-page/components/RewardsTag";
import {
  InfoDescription,
  InfoRow,
  InfoValue,
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

  const { title, token0Symbol, token1Symbol } = usePair(pairId) ?? {};

  const { totalValueLocked, totalValueLockedCap } = vault ?? {};

  const formattedTvl = totalValueLocked
    ? formatNumberWithSuffix(totalValueLocked)
    : loadingPlaceholder;

  const formattedMaxTvl = totalValueLockedCap
    ? formatNumberWithSuffix(totalValueLockedCap)
    : loadingPlaceholder;

  const [token0Icon, token1Icon] = [token0Symbol, token1Symbol].map(
    (symbol) => {
      const imageSource = symbol ? getImageSourceBySymbol(symbol) : null;

      return imageSource ?? undefined;
    }
  );

  return (
    <Wrapper>
      <Container>
        <Content>
          <VaultBrief>
            <Flex>
              {status === VaultStatus.DEPRECATED ? (
                <MigrationTag />
              ) : (
                <RewardsTag />
              )}
            </Flex>
            <PairTitle>
              {title}
              <TokenIconLeftMobile
                alt={token0Symbol}
                draggable={false}
                src={token0Icon}
              />
              <TokenIconRightMobile
                alt={token1Symbol}
                draggable={false}
                src={token1Icon}
              />
            </PairTitle>
            <VaultInfo>
              <InfoRow>
                <InfoDescription>Current Deposits</InfoDescription>
                <InfoValue>{formattedTvl}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoDescription>Max Capacity</InfoDescription>
                <InfoValue>{formattedMaxTvl}</InfoValue>
              </InfoRow>
            </VaultInfo>
          </VaultBrief>
          <Flex alignItems="center">
            <TokenIconLeft
              alt={token0Symbol}
              draggable={false}
              src={token0Icon}
            />
            <TokenIconRight
              alt={token1Symbol}
              draggable={false}
              src={token1Icon}
            />
          </Flex>
        </Content>
      </Container>
    </Wrapper>
  );
};
