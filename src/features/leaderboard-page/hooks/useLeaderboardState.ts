import { useContext } from "react";

import { LeaderboardStateContext } from "../providers/LeaderboardStateProvider";

export const useLeaderboardState = () => useContext(LeaderboardStateContext);
