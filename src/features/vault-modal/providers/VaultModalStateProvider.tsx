import { createContext, useCallback, useMemo, useState } from "react";

import { defaultTokenInputState } from "../../input-card/constants/defaultTokenInputState";
import { useTokenInputState } from "../../input-card/hooks/useTokenInputState";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { useVaultModalQueries } from "../hooks/useVaultModalQueries";
import { TabType } from "../types/TabType";

import type { VaultModalState } from "../types/VaultModalState";
import type { VaultModalStateProviderProps } from "../types/VaultModalStateProviderProps";
import type { FC } from "react";

export const VaultModalStateContext = createContext<VaultModalState>({
  selectedTab: TabType.DEPOSIT,
  setSelectedTab: () => undefined,
  vaultId: "",
  vaultAddress: "",
  depositTokenInputState: defaultTokenInputState,
  withdrawTokenInputState: defaultTokenInputState,
});

export const VaultModalStateProvider: FC<VaultModalStateProviderProps> = ({
  defaultTabType,
  vaultId,
  vaultAddress,
  children,
}) => {
  const [rawSelectedTabType, setRawSelectedTabType] = useState(defaultTabType);

  const { chainId } = getVaultConfig(vaultId);

  const { vaultTokenQuery, nativeCoinQuery, token0Query, token1Query } =
    useVaultModalQueries(vaultId, vaultAddress);

  const nativeCoinData = nativeCoinQuery.data;
  const token0Data = token0Query.data;
  const token1Data = token1Query.data;
  const vaultTokenData = vaultTokenQuery.data;

  // create vaultToken0Data and vaultToken1Data
  // that base on vaultTokenData and uses token0Data / token1Data
  // update symbol GEV -> ETH / USDC

  const vaultToken0Data =
    vaultTokenData && token0Data
      ? {
          ...vaultTokenData,

          symbol: token0Data.symbol,
          address: token0Data.address,
        }
      : undefined;

  const vaultToken1Data =
    vaultTokenData && token1Data
      ? {
          ...vaultTokenData,

          symbol: token1Data.symbol,
          address: token1Data.address,
        }
      : undefined;

  const depositTokenInputState = useTokenInputState(
    [token0Data, token1Data],
    nativeCoinData,
    chainId
  );

  const withdrawTokenInputState = useTokenInputState([
    vaultToken0Data,
    vaultToken1Data,
  ]);

  const selectedTab = rawSelectedTabType;
  const setSelectedTab = useCallback(
    (nextSelectedTab: TabType) => {
      depositTokenInputState.resetState();
      withdrawTokenInputState.resetState();

      setRawSelectedTabType(nextSelectedTab);
    },
    [depositTokenInputState, withdrawTokenInputState]
  );

  const value = useMemo(
    () => ({
      selectedTab,
      setSelectedTab,
      vaultId,
      vaultAddress,
      depositTokenInputState,
      withdrawTokenInputState,
    }),
    [
      selectedTab,
      setSelectedTab,
      vaultId,
      vaultAddress,
      depositTokenInputState,
      withdrawTokenInputState,
    ]
  );

  return (
    <VaultModalStateContext.Provider value={value}>
      {children}
    </VaultModalStateContext.Provider>
  );
};
