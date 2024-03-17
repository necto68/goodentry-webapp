import { LeaderboardStateProvider } from "../providers/LeaderboardStateProvider";
import { Container } from "../styles/LeaderboardPage";

import { AccountRank } from "./AccountRank";
import { Header } from "./Header";
import { Leaderboard } from "./Leaderboard";

export const LeaderboardPage = () => (
  <LeaderboardStateProvider>
    <Container>
      <Header />
      <AccountRank />
      <Leaderboard />
    </Container>
  </LeaderboardStateProvider>
);
