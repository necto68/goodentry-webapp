import { useLockDataQuery } from "../../queries/hooks/useLockDataQuery";

export const useLockData = () => {
  const lockDataQuery = useLockDataQuery();

  return lockDataQuery.data;
};
