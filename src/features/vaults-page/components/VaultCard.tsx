import { InfoIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { generatePath, Link } from "react-router-dom";

import { MyShareInfo } from "../../ez-vault-modal/components/MyShareInfo";
import { getImageSourceBySymbol } from "../../icons/helpers/getImageSourceBySymbol";
import { usePair } from "../../protected-perps-page/hooks/usePair";
import { RoutePathname } from "../../root/types/RoutePathname";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedAPY } from "../../shared/helpers/baseFormatters";
import { formatNumberWithSuffix } from "../../vault/helpers/formatNumberWithSuffix";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { VaultStatus } from "../../vault/types/VaultStatus";
import { useVault } from "../../vault-details-page/hooks/useVault";
import {
  Container,
  InfoDescription,
  InfoRow,
  InfoValue,
  InfoValueBrand,
  Separator,
  TagContainer,
  Title,
  TokenIconLeft,
  TokenIconRight,
  Tokens,
  VaultInfo,
} from "../styles/VaultCard";

import { MigrationTag } from "./MigrationTag";
import { RewardsTag } from "./RewardsTag";

import type { FC } from "react";

export interface VaultCardProps {
  readonly vaultId: string;
}

export const VaultCard: FC<VaultCardProps> = ({ vaultId }) => {
  const {
    supplyRate,
    feesRate,
    totalValueLocked,
    totalValueLockedCap,
    totalAnnualPercentageYield = 0,
  } = useVault(vaultId) ?? {};

  const { pairId, status } = getVaultConfig(vaultId);

  const { title, token0Symbol, token1Symbol } = usePair(pairId) ?? {};

  const [formattedSupplyRate, formattedFeesRate] = [supplyRate, feesRate].map(
    (value) => (value ? getFormattedAPY(value) : loadingPlaceholder)
  );

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

  const getAPYDetails = () => (
    <>
      <p>Supply Interest: {formattedSupplyRate}</p>
      <p>V3 Fees (7d annualized): {formattedFeesRate}</p>
    </>
  );

  const path = generatePath(RoutePathname.EZ_VAULT_DETAILS, { vaultId });

  return (
    <Link to={path}>
      <Container>
        <TagContainer>
          {status === VaultStatus.DEPRECATED ? (
            <MigrationTag />
          ) : (
            <RewardsTag />
          )}
        </TagContainer>
        <Tokens>
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
        </Tokens>
        <Title>{title}</Title>
        <VaultInfo>
          <InfoRow>
            <InfoDescription>
              Projected APR
              <Tooltip label={getAPYDetails()} placement="top">
                <InfoIcon />
              </Tooltip>
            </InfoDescription>
            <InfoValueBrand>
              {getFormattedAPY(totalAnnualPercentageYield)}
            </InfoValueBrand>
          </InfoRow>
          <InfoRow>
            <InfoDescription>TVL</InfoDescription>
            <InfoValue>{formattedTvl}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoDescription>Max Capacity</InfoDescription>
            <InfoValue>{formattedMaxTvl}</InfoValue>
          </InfoRow>
          <Separator />
          <MyShareInfo vaultId={vaultId} />
        </VaultInfo>
      </Container>
    </Link>
  );
};
