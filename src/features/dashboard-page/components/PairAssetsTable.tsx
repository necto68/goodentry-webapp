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
import { useCollateralTokenAssetRow } from "../hooks/useCollateralTokenAssetRow";
import { usePairDetailsState } from "../hooks/usePairDetailsState";
import { useVaultTokenAssetRow } from "../hooks/useVaultTokenAssetRow";
import { TitleContainer } from "../styles/PairAssetsTable";
import { AssetRowType } from "../types/PairAssetsRow";

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
      if (row.type === AssetRowType.COLLATERAL_TOKEN) {
        const { symbol } = row.token;

        return <TitleCell symbols={[symbol]} title={symbol} />;
      }

      // for row.type === AssetRowType.VAULT_TOKEN
      const { vaultId, collateralTokens } = row;
      const symbols: [string, string] = [
        collateralTokens[0].symbol,
        collateralTokens[1].symbol,
      ];
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

    render: (row) => {
      if (row.type === AssetRowType.COLLATERAL_TOKEN) {
        return <ActionButtons pairId={row.pairId} type={row.type} />;
      }

      // for row.type === AssetRowType.VAULT_TOKEN
      return <ActionButtons type={row.type} vaultId={row.vaultId} />;
    },
  },
];

export const PairAssetsTable: FC<PairDetailsTableProps> = ({ pairId }) => {
  const { collateralTokens, vaults, vaultTokens } = usePairDetailsState(pairId);

  const [collateralToken0, collateralToken1] = collateralTokens;
  const [activeVault, deprecatedVault] = vaults;
  const [activeVaultToken, deprecatedVaultToken] = vaultTokens;

  const collateralToken0Row = useCollateralTokenAssetRow(
    pairId,
    collateralToken0
  );
  const collateralToken1Row = useCollateralTokenAssetRow(
    pairId,
    collateralToken1
  );

  const activeVaultTokenRow = useVaultTokenAssetRow(
    activeVault?.id,
    activeVault,
    activeVaultToken,
    collateralTokens
  );
  const deprecatedVaultTokenRow = useVaultTokenAssetRow(
    deprecatedVault?.id,
    deprecatedVault,
    deprecatedVaultToken,
    collateralTokens
  );

  const rows = [
    collateralToken0Row,
    collateralToken1Row,
    activeVaultTokenRow,
    deprecatedVaultTokenRow,
  ];

  return <Table columns={columns} rows={rows} />;
};
