import { useLeaderboardDataQuery } from "../../queries/hooks/useLeaderboardDataQuery";

export const useLeaderboardData = () => {
  const leaderboardDataQuery = useLeaderboardDataQuery();

  return leaderboardDataQuery.data;
};
