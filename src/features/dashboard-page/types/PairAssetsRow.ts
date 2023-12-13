import type { Token } from "../../queries/types/Token";

export enum AssetRowType {
  COLLATERAL_TOKEN = "COLLATERAL_TOKEN",
  VAULT_TOKEN = "VAULT_TOKEN",
}

export interface BaseAssetRow {
  token: Token;
  annualPercentageRate: number;
}
export interface CollateralTokenAssetRow extends BaseAssetRow {
  type: AssetRowType.COLLATERAL_TOKEN;
  pairId: string;
}

export interface VaultTokenAssetRow extends BaseAssetRow {
  type: AssetRowType.VAULT_TOKEN;
  vaultId: string;
  collateralTokens: [Token, Token];
}

export type PairAssetRow = CollateralTokenAssetRow | VaultTokenAssetRow;
