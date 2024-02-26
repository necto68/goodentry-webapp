import { notAvailablePlaceholder } from "../../shared/constants/placeholders";
import {
  getFormattedAPY,
  getFormattedFullCurrency,
} from "../../shared/helpers/baseFormatters";
import { getFormattedTokenAmount } from "../../shared/helpers/formatters";
import { Table } from "../../table/components/Table";
import { usePairDetailsState } from "../hooks/usePairDetailsState";
import { useVaultTokenAssetRow } from "../hooks/useVaultTokenAssetRow";

import { ActionButtons } from "./ActionButtons";
import { VaultCell } from "./VaultCell";

import type { Column } from "../../table/types/Column";
import type { PairAssetRow } from "../types/PairAssetsRow";
import type { FC } from "react";

interface PairDetailsTableProps {
  readonly pairId: string;
}

const columns: Column<PairAssetRow>[] = [
  {
    title: "Vault",
    render: ({ vaultId }) => <VaultCell vaultId={vaultId} />,
  },
  {
    key: "vaultToken",
    title: "Balance",
    render: ({ vaultToken }) => getFormattedTokenAmount(vaultToken.balance),
  },
  {
    title: "Value",

    render: ({ vaultToken: { balance, price } }) =>
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

  const [activeVault] = vaults;
  const [activeVaultToken] = vaultTokens;

  const activeVaultTokenRow = useVaultTokenAssetRow(
    activeVault?.id,
    activeVault,
    activeVaultToken
  );

  const rows = [activeVaultTokenRow];

  return <Table columns={columns} rows={rows} />;
};
