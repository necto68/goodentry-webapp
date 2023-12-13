import type { VaultMigrationConfig } from "../types/VaultMigrationConfig";

export const vaultMigrationConfigs: VaultMigrationConfig[] = [
  { sourceVaultId: "ETH-USDC-V0", targetVaultId: "ETH-USDC" },
  { sourceVaultId: "WBTC-USDC-V0", targetVaultId: "WBTC-USDC" },
  { sourceVaultId: "ARB-USDC-V0", targetVaultId: "ARB-USDC" },
  { sourceVaultId: "GMX-USDC-V0", targetVaultId: "GMX-USDC" },
];
