import { useContext } from "react";

import { VaultStakeModalStateContext } from "../providers/VaultStakeModalStateProvider";

export const useVaultStakeModalState = () =>
  useContext(VaultStakeModalStateContext);
