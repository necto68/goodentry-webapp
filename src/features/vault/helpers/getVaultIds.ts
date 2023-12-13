import { vaultConfigs } from "../constants/vaultConfigs";

export const getVaultIds = () => vaultConfigs.map(({ id }) => id);
