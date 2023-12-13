import { createContext, useCallback, useMemo, useState } from "react";

import { defaultTokenInputState } from "../../input-card/constants/defaultTokenInputState";
import { useTokenInputState } from "../../input-card/hooks/useTokenInputState";
import { getAvailableToWithdrawBalance } from "../helper/getAvailableToWithdrawBalance";
import { useLendingPoolModalQueries } from "../hooks/useLendingPoolModalQueries";
import { TabType } from "../types/TabType";

import type { LendingPoolModalState } from "../types/LendingPoolModalState";
import type { LendingPoolModalStateProviderProps } from "../types/LendingPoolModalStateProviderProps";
import type { FC } from "react";

export const LendingPoolModalStateContext =
  createContext<LendingPoolModalState>({
    selectedTab: TabType.DEPOSIT,
    setSelectedTab: () => undefined,
    pairId: "",
    lendingPoolAddress: "",
    depositTokenInputState: defaultTokenInputState,
    withdrawTokenInputState: defaultTokenInputState,
  });

export const LendingPoolModalStateProvider: FC<
  LendingPoolModalStateProviderProps
> = ({ defaultTabType, pairId, lendingPoolAddress, children }) => {
  const [rawSelectedTabType, setRawSelectedTabType] = useState(defaultTabType);

  const { lendingPoolQuery, token1Query, aToken0Query, aToken1Query } =
    useLendingPoolModalQueries(pairId, lendingPoolAddress);

  const lendingPoolData = lendingPoolQuery.data;
  const token1Data = token1Query.data;
  const aToken0Data = aToken0Query.data;
  const aToken1Data = aToken1Query.data;

  const { availableToWithdraw } = lendingPoolData ?? {};

  const aToken0DataToWithdraw =
    aToken0Data && availableToWithdraw !== undefined
      ? {
          ...aToken0Data,

          // availableToWithdraw in terms if USDC
          // need to divide by price to get token balance
          balance: getAvailableToWithdrawBalance(
            availableToWithdraw,
            aToken0Data
          ),
        }
      : undefined;

  const aToken1DataToWithdraw =
    aToken1Data && availableToWithdraw !== undefined
      ? {
          ...aToken1Data,

          balance: getAvailableToWithdrawBalance(
            availableToWithdraw,
            aToken1Data
          ),
        }
      : undefined;

  const depositTokenInputState = useTokenInputState([
    // show only USDC for depositing
    token1Data,
  ]);

  const withdrawTokenInputState = useTokenInputState([
    aToken0DataToWithdraw,
    aToken1DataToWithdraw,
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
      pairId,
      lendingPoolAddress,
      depositTokenInputState,
      withdrawTokenInputState,
    }),
    [
      selectedTab,
      setSelectedTab,
      pairId,
      lendingPoolAddress,
      depositTokenInputState,
      withdrawTokenInputState,
    ]
  );

  return (
    <LendingPoolModalStateContext.Provider value={value}>
      {children}
    </LendingPoolModalStateContext.Provider>
  );
};
