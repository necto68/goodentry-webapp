import { createContext, useEffect, useMemo, useState } from "react";

import { useLeaderboardData } from "../hooks/useLeaderboardData";
import { TabType } from "../types/TabType";

import type { LeaderboardState } from "../types/LeaderboardState";
import type { FC, PropsWithChildren } from "react";

export const LeaderboardStateContext = createContext<LeaderboardState>({
  selectedTab: TabType.WINNERS,
  setSelectedTab: () => undefined,
  selectedWeek: "",
  setSelectedWeek: () => undefined,
  addressFilterValue: "",
  setAddressFilterValue: () => undefined,
  weeks: [],
  selectedWeekRows: null,
});

export const LeaderboardStateProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const data = useLeaderboardData();

  const [selectedTab, setSelectedTab] = useState(TabType.WINNERS);
  const [selectedWeek, setSelectedWeek] = useState("");
  const [addressFilterValue, setAddressFilterValue] = useState("");

  useEffect(() => {
    if (!data || selectedWeek) {
      return;
    }

    const latestWeek = data[data.length - 1].week;

    setSelectedWeek(latestWeek.toString());
  }, [data, selectedWeek]);

  const selectedWeekRows = useMemo(() => {
    if (!data || !selectedWeek) {
      return null;
    }

    const selectedWeekData = data.find(
      ({ week }) => week === Number(selectedWeek)
    );

    return selectedWeekData?.rows ?? null;
  }, [data, selectedWeek]);

  const weeks = useMemo(() => {
    if (!data) {
      return [];
    }

    return data
      .map(({ week }) => week)
      .sort((a, b) => b - a)
      .map((week) => week.toString());
  }, [data]);

  const value = useMemo(
    () => ({
      selectedTab,
      setSelectedTab,
      selectedWeek,
      setSelectedWeek,
      addressFilterValue,
      setAddressFilterValue,
      weeks,
      selectedWeekRows,
    }),
    [
      selectedTab,
      setSelectedTab,
      selectedWeek,
      setSelectedWeek,
      addressFilterValue,
      setAddressFilterValue,
      weeks,
      selectedWeekRows,
    ]
  );

  return (
    <LeaderboardStateContext.Provider value={value}>
      {children}
    </LeaderboardStateContext.Provider>
  );
};
