import { createContext, useMemo } from "react";

import { getPairConfig } from "../../pair/helpers/getPairConfig";

import type { GeWalletState } from "../types/GeWalletState";
import type { GeWalletStateProviderProps } from "../types/GeWalletStateProviderProps";
import type { FC } from "react";

export const GeWalletStateContext = createContext<GeWalletState>({
  pairId: "",
  lendingPoolAddress: "",
});

export const GeWalletStateProvider: FC<GeWalletStateProviderProps> = ({
  pairId,
  children,
}) => {
  const {
    addresses: { lendingPool },
  } = getPairConfig(pairId);

  const value = useMemo(
    () => ({
      pairId,
      lendingPoolAddress: lendingPool,
    }),
    [pairId, lendingPool]
  );

  return (
    <GeWalletStateContext.Provider value={value}>
      {children}
    </GeWalletStateContext.Provider>
  );
};
