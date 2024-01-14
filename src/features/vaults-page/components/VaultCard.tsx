import { InfoIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { useCallback } from "react";
import { generatePath, Link } from "react-router-dom";

import { MyShareInfo } from "../../ez-vault-modal/components/MyShareInfo";
import { getImageSourceBySymbol } from "../../icons/helpers/getImageSourceBySymbol";
import { usePair } from "../../protected-perps-page/hooks/usePair";
import { RoutePathname } from "../../root/types/RoutePathname";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedAPY } from "../../shared/helpers/baseFormatters";
import { InfoRow } from "../../shared/modal/styles/ModalInfo";
import { formatNumberWithSuffix } from "../../vault/helpers/formatNumberWithSuffix";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { VaultStatus } from "../../vault/types/VaultStatus";
import { useVault } from "../../vault-details-page/hooks/useVault";
import { useVaultApiData } from "../../vault-details-page/hooks/useVaultApiData";
import {
  Container,
  InfoDescription,
  InfoValueBold,
  InfoValueBrand,
  NoTag,
  Separator,
  TagContainer,
  Title,
  TokenIconLeft,
  TokenIconRight,
  Tokens,
  VaultInfo,
} from "../styles/VaultCard";

import { RewardsTag } from "./RewardsTag";

import type { FC } from "react";

export interface VaultCardProps {
  readonly vaultId: string;
}

export const VaultCard: FC<VaultCardProps> = ({ vaultId }) => {
  const { totalValueLocked } = useVault(vaultId) ?? {};

  const { pairId, status } = getVaultConfig(vaultId);

  const { avgApr, incentiveApr, totalApr } = useVaultApiData(vaultId) ?? {};

  const { title, baseTokenSymbol, quoteTokenSymbol } = usePair(pairId) ?? {};

  const formattedTvl = totalValueLocked
    ? formatNumberWithSuffix(totalValueLocked)
    : loadingPlaceholder;

  const [formattedApr, formattedIncentivesApr, formattedTotalApr] = [
    avgApr,
    incentiveApr,
    totalApr,
  ].map((value) => (value ? getFormattedAPY(value) : loadingPlaceholder));

  const [baseTokenIcon, quoteTokenIcon] = [
    baseTokenSymbol,
    quoteTokenSymbol,
  ].map((symbol) => {
    const imageSource = symbol ? getImageSourceBySymbol(symbol) : null;

    return imageSource ?? undefined;
  });

  const path = generatePath(RoutePathname.EZ_VAULT_DETAILS, { vaultId });

  const getTooltipContent = useCallback(
    () => (
      <>
        <p>Fees APR: {formattedApr}</p>
        {status === VaultStatus.ACTIVE_REWARDS ? (
          <p>Incentive APR: {formattedIncentivesApr}</p>
        ) : null}
      </>
    ),
    [status, formattedApr, formattedIncentivesApr]
  );

  return (
    <Link to={path}>
      <Container>
        <TagContainer>
          {status === VaultStatus.ACTIVE_REWARDS ? <RewardsTag /> : <NoTag />}
        </TagContainer>
        <Tokens>
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
        </Tokens>
        <Title>{title}</Title>
        <VaultInfo>
          <InfoRow>
            <InfoDescription>
              Projected APR
              <Tooltip label={getTooltipContent()} placement="top">
                <InfoIcon />
              </Tooltip>
            </InfoDescription>
            <InfoValueBrand>{formattedTotalApr}</InfoValueBrand>
          </InfoRow>
          <InfoRow>
            <InfoDescription>TVL</InfoDescription>
            <InfoValueBold>{formattedTvl}</InfoValueBold>
          </InfoRow>
          <Separator />
          <MyShareInfo vaultId={vaultId} />
        </VaultInfo>
      </Container>
    </Link>
  );
};
