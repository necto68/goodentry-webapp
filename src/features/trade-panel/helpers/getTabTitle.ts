import { TabType } from "../types/TabType";

export const getTabTitle = (selectedTab: TabType) =>
  selectedTab === TabType.LONG ? "Long" : "Short";
