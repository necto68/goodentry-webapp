import { Container, Title } from "../../protected-perps-page/styles/Positions";
import { ComponentContainer } from "../../protected-perps-page/styles/ProtectedPerpsPage";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { useLeaderboardState } from "../hooks/useLeaderboardState";

import { LeaderboardTable } from "./LeaderboardTable";
import { LeaderboardTableHeader } from "./LeaderboardTableHeader";

export const Leaderboard = () => {
  const { selectedWeekRows } = useLeaderboardState();

  if (!selectedWeekRows) {
    return (
      <ComponentContainer>
        <Title>{loadingPlaceholder}</Title>
      </ComponentContainer>
    );
  }

  if (selectedWeekRows.length === 0) {
    return (
      <ComponentContainer>
        <Title>No Leaderboard</Title>
      </ComponentContainer>
    );
  }

  return (
    <Container>
      <LeaderboardTableHeader />
      <LeaderboardTable />
    </Container>
  );
};
