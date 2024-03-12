import { useState } from "react";

import { Container, Title } from "../../protected-perps-page/styles/Positions";
import { ComponentContainer } from "../../protected-perps-page/styles/ProtectedPerpsPage";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { useLeaderboardData } from "../hooks/useLeaderboardData";
import { TabType } from "../types/TabType";

import { LeaderboardTable } from "./LeaderboardTable";
import { LeaderboardTableHeader } from "./LeaderboardTableHeader";

export const Leaderboard = () => {
  const rows = useLeaderboardData();
  const [selectedTab, setSelectedTab] = useState(TabType.WINNERS);
  const [filterValue, setFilterValue] = useState("");

  if (!rows) {
    return (
      <ComponentContainer>
        <Title>{loadingPlaceholder}</Title>
      </ComponentContainer>
    );
  }

  if (rows.length === 0) {
    return (
      <ComponentContainer>
        <Title>No Leaderboard</Title>
      </ComponentContainer>
    );
  }

  return (
    <Container>
      <LeaderboardTableHeader
        filterValue={filterValue}
        selectedTab={selectedTab}
        setFilterValue={setFilterValue}
        setSelectedTab={setSelectedTab}
      />
      <LeaderboardTable filterValue={filterValue} selectedTab={selectedTab} />
    </Container>
  );
};
