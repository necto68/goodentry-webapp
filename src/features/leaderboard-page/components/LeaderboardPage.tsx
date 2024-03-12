import { Container } from "../styles/LeaderboardPage";

import { AccountRank } from "./AccountRank";
import { Header } from "./Header";
import { Leaderboard } from "./Leaderboard";

export const LeaderboardPage = () => (
  <Container>
    <Header />
    <AccountRank />
    <Leaderboard />
  </Container>
);
