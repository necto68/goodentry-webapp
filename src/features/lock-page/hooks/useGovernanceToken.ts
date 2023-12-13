import { useLockQueries } from "./useLockQueries";

export const useGovernanceToken = () => {
  const { governanceTokenQuery } = useLockQueries();

  return governanceTokenQuery.data;
};
