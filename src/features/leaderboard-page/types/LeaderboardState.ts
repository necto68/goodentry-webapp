import type { TabType } from "./TabType";
import type { LeaderboardRow } from "../../queries/types/LeaderboardData";

export interface LeaderboardState {
  readonly selectedTab: TabType;
  readonly setSelectedTab: (tab: TabType) => void;
  readonly selectedWeek: string;
  readonly setSelectedWeek: (week: string) => void;
  readonly addressFilterValue: string;
  readonly setAddressFilterValue: (filter: string) => void;
  readonly weeks: string[];
  readonly selectedWeekRows: LeaderboardRow[] | null;
}
