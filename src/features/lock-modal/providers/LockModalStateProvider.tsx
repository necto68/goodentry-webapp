import { createContext, useCallback, useMemo, useState } from "react";

import { defaultTokenInputState } from "../../input-card/constants/defaultTokenInputState";
import { useTokenInputState } from "../../input-card/hooks/useTokenInputState";
import { useLockQueries } from "../../lock-page/hooks/useLockQueries";
import { TabType } from "../types/TabType";

import type { LockModalState } from "../types/LockModalState";
import type { LockModalStateProviderProps } from "../types/LockModalStateProviderProps";
import type { FC } from "react";

export const LockModalStateContext = createContext<LockModalState>({
  selectedTab: TabType.LOCK,
  setSelectedTab: () => undefined,
  lockTokenInputState: defaultTokenInputState,
  unlockTokenInputState: defaultTokenInputState,
});

export const LockModalStateProvider: FC<LockModalStateProviderProps> = ({
  defaultTabType,
  children,
}) => {
  const [rawSelectedTabType, setRawSelectedTabType] = useState(defaultTabType);

  const { lockTokenQuery, governanceTokenQuery, lockDataQuery } =
    useLockQueries();

  const lockTokenData = lockTokenQuery.data;
  const rawGovernanceTokenData = governanceTokenQuery.data;
  const lockData = lockDataQuery.data;

  const governanceTokenData =
    rawGovernanceTokenData?.balance && lockData?.unlockBalance
      ? {
          ...rawGovernanceTokenData,

          balance: rawGovernanceTokenData.balance.sub(lockData.unlockBalance),
        }
      : rawGovernanceTokenData;

  const lockTokenInputState = useTokenInputState([lockTokenData]);
  const unlockTokenInputState = useTokenInputState([governanceTokenData]);

  const selectedTab = rawSelectedTabType;
  const setSelectedTab = useCallback(
    (nextSelectedTab: TabType) => {
      lockTokenInputState.resetState();
      unlockTokenInputState.resetState();

      setRawSelectedTabType(nextSelectedTab);
    },
    [lockTokenInputState, unlockTokenInputState]
  );

  const value = useMemo(
    () => ({
      selectedTab,
      setSelectedTab,
      lockTokenInputState,
      unlockTokenInputState,
    }),
    [selectedTab, setSelectedTab, lockTokenInputState, unlockTokenInputState]
  );

  return (
    <LockModalStateContext.Provider value={value}>
      {children}
    </LockModalStateContext.Provider>
  );
};
