import { usePair } from "../../protected-perps-page/hooks/usePair";
import { TitleCell } from "../../table/components/TitleCell";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { VaultStatus } from "../../vault/types/VaultStatus";
import { MigrationTag } from "../../vaults-page/components/MigrationTag";
import { RewardsTag } from "../../vaults-page/components/RewardsTag";
import { TitleContainer } from "../styles/PairAssetsTable";

import type { FC } from "react";

interface VaultCellProps {
  readonly vaultId: string;
}

export const VaultCell: FC<VaultCellProps> = ({ vaultId }) => {
  const { pairId, status } = getVaultConfig(vaultId);

  const { baseTokenSymbol, quoteTokenSymbol } = usePair(pairId) ?? {};

  const symbols: [string, string] | undefined =
    baseTokenSymbol && quoteTokenSymbol
      ? [baseTokenSymbol, quoteTokenSymbol]
      : undefined;

  return (
    <TitleContainer>
      <TitleCell symbols={symbols} title="ezVault" />
      {status === VaultStatus.ACTIVE_REWARDS ? <RewardsTag /> : null}
      {status === VaultStatus.DEPRECATED ? <MigrationTag /> : null}
    </TitleContainer>
  );
};
