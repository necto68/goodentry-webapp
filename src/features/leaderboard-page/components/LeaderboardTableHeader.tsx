import { Input } from "@chakra-ui/react";
import { type FC, type ChangeEvent, useCallback } from "react";
import { BiSortUp, BiSortDown } from "react-icons/bi";

import { Switcher } from "../../form-components/components/Switcher";
import { InputGroupContainer } from "../../input-card/styles/InputCard";
import { Container } from "../styles/LeaderboardTableHeader";
import { TabType } from "../types/TabType";

import type { LeaderboardTableHeaderProps } from "../types/LeaderboardTableHeaderProps";

export const LeaderboardTableHeader: FC<LeaderboardTableHeaderProps> = ({
  selectedTab,
  setSelectedTab,
  filterValue,
  setFilterValue,
}) => {
  const isWinnersTab = selectedTab === TabType.WINNERS;

  const handleTabClick = (tab: number) => {
    setSelectedTab(tab === 0 ? TabType.WINNERS : TabType.LOSERS);
  };

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFilterValue(event.target.value);
    },
    [setFilterValue]
  );

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
      <InputGroupContainer isError={false}>
        <Input
          onChange={handleInputChange}
          placeholder="Search Account"
          value={filterValue}
          variant="filled"
        />
      </InputGroupContainer>
    </Container>
  );
};
