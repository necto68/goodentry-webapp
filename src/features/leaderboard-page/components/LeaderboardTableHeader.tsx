import { Input } from "@chakra-ui/react";
import { type ChangeEvent, useCallback } from "react";
import { BiSortUp, BiSortDown } from "react-icons/bi";

import { Dropdown } from "../../dropdown/components/Dropdown";
import { Switcher } from "../../form-components/components/Switcher";
import { InputGroupContainer } from "../../input-card/styles/InputCard";
import { useLeaderboardState } from "../hooks/useLeaderboardState";
import { Container, RightContent } from "../styles/LeaderboardTableHeader";
import { TabType } from "../types/TabType";

export const LeaderboardTableHeader = () => {
  const {
    selectedTab,
    setSelectedTab,
    selectedWeek,
    setSelectedWeek,
    addressFilterValue,
    setAddressFilterValue,
    weeks,
  } = useLeaderboardState();

  const isWinnersTab = selectedTab === TabType.WINNERS;

  const handleTabClick = (tab: number) => {
    setSelectedTab(tab === 0 ? TabType.WINNERS : TabType.LOSERS);
  };

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setAddressFilterValue(event.target.value);
    },
    [setAddressFilterValue]
  );

  const options = weeks.map((week) => ({
    label: `Week ${week}`,
    value: week,
  }));

  return (
    <Container>
      <Switcher
        icon0={<BiSortUp size={18} />}
        icon1={<BiSortDown size={18} />}
        onTabClick={handleTabClick}
        tab={isWinnersTab ? 0 : 1}
        title0="Biggest Winners"
        title1="Biggest Losers"
      />
      <RightContent>
        <Dropdown
          onChange={setSelectedWeek}
          options={options}
          value={selectedWeek}
        />
        <InputGroupContainer isError={false}>
          <Input
            onChange={handleInputChange}
            placeholder="Search Account"
            value={addressFilterValue}
            variant="filled"
          />
        </InputGroupContainer>
      </RightContent>
    </Container>
  );
};
