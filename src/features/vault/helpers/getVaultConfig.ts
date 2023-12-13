import { vaultConfigs } from "../constants/vaultConfigs";

export const vaultConfigsMap = new Map(
  vaultConfigs.map((vault) => [vault.id, vault])
);

export const getVaultConfig = (vaultId: string) => {
  const vaultConfig = vaultConfigsMap.get(vaultId);

  if (vaultConfig) {
    return vaultConfig;
  }

  return vaultConfigs[0];
};
