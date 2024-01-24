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
  depositTokenInputState: defaultTokenInputState,
  withdrawTokenInputState: defaultTokenInputState,
});

export const VaultModalStateProvider: FC<VaultModalStateProviderProps> = ({
  defaultTabType,
  vaultId,
  children,
}) => {
  const [rawSelectedTabType, setRawSelectedTabType] = useState(defaultTabType);

  const { chainId } = getVaultConfig(vaultId);

  const { vaultTokenQuery, nativeCoinQuery, baseTokenQuery, quoteTokenQuery } =
    useVaultModalQueries(vaultId);

  const nativeCoinData = nativeCoinQuery.data;
  const baseTokenData = baseTokenQuery.data;
  const quoteTokenData = quoteTokenQuery.data;
  const vaultTokenData = vaultTokenQuery.data;

  // create vaultBaseTokenData and vaultQuoteTokenData
  // that base on vaultTokenData and uses baseTokenData / quoteTokenData
  // update symbol GEV -> ETH / USDC

  const vaultBaseTokenData =
    vaultTokenData && baseTokenData
      ? {
          ...vaultTokenData,

          symbol: baseTokenData.symbol,
          address: baseTokenData.address,
        }
      : undefined;

  const vaultQuoteTokenData =
    vaultTokenData && quoteTokenData
      ? {
          ...vaultTokenData,

          symbol: quoteTokenData.symbol,
          address: quoteTokenData.address,
        }
      : undefined;

  const depositTokenInputState = useTokenInputState(
    [baseTokenData, quoteTokenData],
    nativeCoinData,
    chainId
  );

  const withdrawTokenInputState = useTokenInputState([
    vaultBaseTokenData,
    vaultQuoteTokenData,
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
      depositTokenInputState,
      withdrawTokenInputState,
    }),
    [
      selectedTab,
      setSelectedTab,
      vaultId,
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
