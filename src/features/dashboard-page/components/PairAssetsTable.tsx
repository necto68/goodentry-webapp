import { notAvailablePlaceholder } from "../../shared/constants/placeholders";
import {
  getFormattedAPY,
  getFormattedFullCurrency,
} from "../../shared/helpers/baseFormatters";
import { getFormattedTokenAmount } from "../../shared/helpers/formatters";
import { Table } from "../../table/components/Table";
import { TitleCell } from "../../table/components/TitleCell";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { VaultStatus } from "../../vault/types/VaultStatus";
import { MigrationTag } from "../../vaults-page/components/MigrationTag";
import { usePairDetailsState } from "../hooks/usePairDetailsState";
import { useVaultTokenAssetRow } from "../hooks/useVaultTokenAssetRow";
import { TitleContainer } from "../styles/PairAssetsTable";

import { ActionButtons } from "./ActionButtons";

import type { Column } from "../../table/types/Column";
import type { PairAssetRow } from "../types/PairAssetsRow";
import type { FC } from "react";

interface PairDetailsTableProps {
  readonly pairId: string;
}

const columns: Column<PairAssetRow>[] = [
  {
    title: "Asset",

    render: (row) => {
      const { vaultId } = row;

      // TODO: v2 update
      const symbols: [string, string] = ["", ""];
      const { status } = getVaultConfig(vaultId);

      return (
        <TitleContainer>
          <TitleCell symbols={symbols} title="ezVault" />
          {status === VaultStatus.DEPRECATED ? <MigrationTag /> : null}
        </TitleContainer>
      );
    },
  },
  {
    key: "token",
    title: "Balance",
    render: ({ token }) => getFormattedTokenAmount(token.balance),
  },
  {
    title: "Value",

    render: ({ token: { balance, price } }) =>
      balance
        ? getFormattedFullCurrency(balance.mul(price).toNumber())
        : notAvailablePlaceholder,
  },
  {
    key: "annualPercentageRate",
    title: "APR",
    render: ({ annualPercentageRate }) => getFormattedAPY(annualPercentageRate),
  },
  {
    title: "Actions",

    render: (row) => <ActionButtons type={row.type} vaultId={row.vaultId} />,
  },
];

export const PairAssetsTable: FC<PairDetailsTableProps> = ({ pairId }) => {
  const { vaults, vaultTokens } = usePairDetailsState(pairId);

  const [activeVault, deprecatedVault] = vaults;
  const [activeVaultToken, deprecatedVaultToken] = vaultTokens;

  const activeVaultTokenRow = useVaultTokenAssetRow(
    activeVault?.id,
    activeVault,
    activeVaultToken
  );

  const deprecatedVaultTokenRow = useVaultTokenAssetRow(
    deprecatedVault?.id,
    deprecatedVault,
    deprecatedVaultToken
  );

  const rows = [activeVaultTokenRow, deprecatedVaultTokenRow];

  return <Table columns={columns} rows={rows} />;
};
