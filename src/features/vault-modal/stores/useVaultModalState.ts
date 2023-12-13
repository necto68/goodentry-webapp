import { useContext } from "react";

import { VaultModalStateContext } from "../providers/VaultModalStateProvider";

export const useVaultModalState = () => useContext(VaultModalStateContext);
