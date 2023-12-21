import type { Token } from "../../queries/types/Token";

export enum AssetRowType {
  VAULT_TOKEN = "VAULT_TOKEN",
}

export interface VaultTokenAssetRow {
  type: AssetRowType.VAULT_TOKEN;
  vaultId: string;
  token: Token;
  annualPercentageRate: number;
}

export type PairAssetRow = VaultTokenAssetRow;
