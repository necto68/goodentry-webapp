import type { VaultToken } from "../../queries/types/VaultToken";

export enum AssetRowType {
  VAULT_TOKEN = "VAULT_TOKEN",
}

export interface VaultTokenAssetRow {
  type: AssetRowType.VAULT_TOKEN;
  vaultId: string;
  vaultToken: VaultToken;
  annualPercentageRate: number;
}

export type PairAssetRow = VaultTokenAssetRow;
