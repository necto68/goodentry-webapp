import type { TabType } from "./TabType";

export interface LeaderboardTableHeaderProps {
  readonly selectedTab: TabType;
  readonly setSelectedTab: (tab: TabType) => void;
  readonly filterValue: string;
  readonly setFilterValue: (filter: string) => void;
}
