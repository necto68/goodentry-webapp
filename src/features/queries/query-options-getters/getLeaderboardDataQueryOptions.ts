import { leaderboardDataFetcher } from "../fetchers/leaderboardDataFetcher";
import { QueryType } from "../types/QueryType";

export const getLeaderboardDataQueryOptions = () => ({
  queryKey: [QueryType.LEADERBOARD_DATA],
  queryFn: async () => await leaderboardDataFetcher(),
  staleTime: Number.POSITIVE_INFINITY,
});
